# Arquivo: app.py
import os
import json
import re
from flask import Flask, request, Response
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import tools
import prompts

app = Flask(__name__)
CORS(app)

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("A chave de API do Google não foi encontrada.")
genai.configure(api_key=GOOGLE_API_KEY)

AVAILABLE_TOOLS = {
    "save_memory": tools.save_memory,
    "focused_web_search": tools.focused_web_search,
    "get_inmet_forecast": tools.get_inmet_forecast,
    "local_database_search": tools.local_database_search, # Nova ferramenta
}

# --- CÉREBRO DO AGENTE ---
@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    coordinates = request.json.get('coordinates')
    if not user_message: return Response(status=400)

    location_string = tools.get_location_name(lat=coordinates['latitude'], lon=coordinates['longitude']) if coordinates else ""
    
    def stream_generation():
        plan = {}
        tool_result = ""
        try:
            # ETAPA 1: PLANEJAMENTO
            model = genai.GenerativeModel('gemini-1.5-flash-latest')
            planner_response = model.generate_content(prompts.PLANNER_PROMPT.format(user_message=user_message))
            
            cleaned_json_text = re.search(r'\{.*\}', planner_response.text, re.DOTALL).group(0)
            plan = json.loads(cleaned_json_text)
            
            tool_name = plan.get("tool_name")
            parameters = plan.get("parameters") or {}
            
            # ETAPA 2: EXECUÇÃO
            if tool_name in AVAILABLE_TOOLS:
                status_message = f"Consultando a ferramenta: {tool_name}..."
                yield f'data: {json.dumps({"type": "status", "message": status_message})}\n\n'
                
                tool_function = AVAILABLE_TOOLS[tool_name]
                
                if tool_name == 'get_inmet_forecast':
                    tool_result = tool_function(lat=coordinates['latitude'], lon=coordinates['longitude']) if coordinates else "Instrução: Ative a localização para obter a previsão do tempo."
                elif tool_name == 'focused_web_search':
                    tool_result = tool_function(query=parameters.get("query", user_message), location_string=location_string)
                else:
                    tool_result = tool_function(**parameters)
            else: # answer_directly
                tool_result = "Olá! Sou Ekko. Como posso ser útil hoje?"

            if tool_name in ["save_memory", "answer_directly"] or (tool_name == "get_inmet_forecast" and not coordinates):
                yield f'data: {json.dumps({"type": "chunk", "message": tool_result})}\n\n'
                return

        except Exception as e:
            print(f"!!! ERRO no ciclo de Agente: {e}")
            tool_result = f"Ocorreu um erro no meu raciocínio. Detalhe: {str(e)}"

        # ETAPA 3: SÍNTESE
        long_term_memory = tools.recall_memories()
        synthesizer_prompt = prompts.SYNTHESIZER_PROMPT.format(
            long_term_memory=long_term_memory, user_message=user_message, tool_result=tool_result
        )
        
        synthesis_model = genai.GenerativeModel('gemini-1.5-pro-latest')
        generation_config = genai.types.GenerationConfig(temperature=0.1)
        response_stream = synthesis_model.generate_content(synthesizer_prompt, generation_config=generation_config, stream=True)
        for chunk in response_stream:
            if chunk.text:
                yield f'data: {json.dumps({"type": "chunk", "message": chunk.text})}\n\n'

    return Response(stream_generation(), mimetype='text/event-stream')

if __name__ == '__main__':
    tools.init_memory_db()
    tools.load_inmet_stations()
    tools.load_and_index_local_database() # Carrega a nova base de dados local
    print("Servidor Ekko (MODO HÍBRIDO) iniciado.")
    app.run(host='0.0.0.0', port=5000, debug=False)