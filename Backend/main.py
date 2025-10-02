"""
EKKO - API Principal
FastAPI com MongoDB Atlas
"""

from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional
from datetime import datetime, timedelta
from pymongo import MongoClient
from dotenv import load_dotenv
import uuid
import uvicorn
import os

# Imports adicionados para o Ekko
import requests
import json
import re
import random
import tool  # O nosso arquivo tools.py
import prompts # O nosso arquivo prompts.py


# Imports locais
from database import unity_profiles, unity_soil_data, API_HOST, API_PORT, API_DEBUG, client, DB_NAME
from ai_analyzer import analyze_soil_complete, get_main_crop, count_ideal_parameters, analyze_trend, calculate_sustainability, calculate_soil_health

app = FastAPI(title="EKKO Unity API - Atlas", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos
class UnityProfile(BaseModel):
    nome: str
    email: str
    telefone: str
    cpf: str
    propriedade: Dict[str, Any]

class SoilData(BaseModel):
    session_id: str
    ph: float
    umidade: float
    temperatura: float
    salinidade: float
    condutividade: float
    nitrogenio: float
    fosforo: float
    potassio: float
    # Campos opcionais
    densidade: Optional[float] = 1.2
    materia_organica: Optional[float] = 3.5
    calcio: Optional[float] = 500
    magnesio: Optional[float] = 120
    enxofre: Optional[float] = 20
    player_actions: Optional[Dict[str, Any]] = None
    game_metrics: Optional[Dict[str, Any]] = None
    cultivo_atual: Optional[str] = "Milho"
    estacao: Optional[str] = "Crescimento"

@app.get("/unity/status")
def get_status():
    try:
        # Testar conexão
        client.admin.command('ping')
        
        # Contar documentos
        profiles_count = unity_profiles.count_documents({})
        soil_count = unity_soil_data.count_documents({})
        
        return {
            "status": "online",
            "database": "connected",
            "db_name": DB_NAME,
            "profiles": profiles_count,
            "soil_data": soil_count
        }
    except Exception as e:
        return {
            "status": "error",
            "database": "disconnected",
            "error": str(e)
        }

@app.post("/unity/profile/create")
def create_profile(profile: UnityProfile):
    unity_id = f"unity_{uuid.uuid4().hex[:12]}"
    
    profile_doc = {
        "_id": unity_id,
        "dados_pessoais": {
            "nome": profile.nome,
            "email": profile.email,
            "telefone": profile.telefone,
            "cpf": profile.cpf
        },
        "propriedade": profile.propriedade,
        "unity_stats": {
            "total_sessions": 0,
            "best_score": 0,
            "total_playtime": 0
        },
        "created_at": datetime.utcnow(),
        "status": "active"
    }
    
    unity_profiles.insert_one(profile_doc)
    
    return {
        "status": "success",
        "unity_id": unity_id,
        "message": "Perfil Unity criado no Atlas"
    }

@app.get("/unity/login/{unity_id}")
def login(unity_id: str):
    profile = unity_profiles.find_one({"_id": unity_id})
    
    if not profile:
        raise HTTPException(status_code=404, detail="ID não encontrado")
    
    return {
        "status": "success",
        "unity_id": unity_id,
        "profile": profile
    }

@app.post("/unity/soil/save/{unity_id}")
def save_soil(unity_id: str, soil: SoilData):
    # Verificar se perfil existe
    if not unity_profiles.find_one({"_id": unity_id}):
        raise HTTPException(status_code=404, detail="ID não encontrado")
    
    # Valores padrão para campos não enviados pelo Unity
    default_actions = {
        "irrigacao": round(soil.umidade * 0.8, 2),
        "fertilizante_npk": {
            "N": round(soil.nitrogenio * 0.4, 2),
            "P": round(soil.fosforo * 0.2, 2),
            "K": round(soil.potassio * 0.3, 2)
        },
        "calagem": round(0.5, 2),
        "materia_organica_adicionada": round(1.0, 2)
    }
    
    default_metrics = {
        "score": int((soil.ph * 100) + (soil.umidade * 10)),
        "money_spent": round(soil.condutividade * 200, 2),
        "sustainability_index": round(min(soil.ph / 7.0, 1.0), 2),
        "productivity_estimate": int((soil.nitrogenio + soil.fosforo + soil.potassio) / 3)
    }
    
    soil_doc = {
        "_id": f"soil_{unity_id}_{int(datetime.utcnow().timestamp())}",
        "unity_id": unity_id,
        "timestamp": datetime.utcnow(),
        "soil_parameters": {
            "ph": round(soil.ph, 2),
            "umidade": round(soil.umidade, 2),
            "temperatura": round(soil.temperatura, 2),
            "salinidade": round(soil.salinidade, 2),
            "condutividade": round(soil.condutividade, 2),
            "densidade": round(soil.densidade, 2),
            "materia_organica": round(soil.materia_organica, 2)
        },
        "nutrients": {
            "nitrogenio": round(soil.nitrogenio, 2),
            "fosforo": round(soil.fosforo, 2),
            "potassio": round(soil.potassio, 2),
            "calcio": round(soil.calcio, 2),
            "magnesio": round(soil.magnesio, 2),
            "enxofre": round(soil.enxofre, 2)
        },
        "player_actions": soil.player_actions or default_actions,
        "game_metrics": soil.game_metrics or default_metrics,
        "cultivo_atual": soil.cultivo_atual,
        "estacao": soil.estacao,
        "health_score": int((soil.ph * 10) + (soil.umidade * 0.5) + 30)
    }
    
    result = unity_soil_data.insert_one(soil_doc)
    
    return {
        "status": "success",
        "soil_id": str(result.inserted_id),
        "message": "Dados salvos no Atlas"
    }

@app.get("/unity/dashboard/{unity_id}")
def get_dashboard(unity_id: str):
    # Buscar perfil
    profile = unity_profiles.find_one({"_id": unity_id})
    if not profile:
        raise HTTPException(status_code=404, detail="Unity ID não encontrado")
    
    # Buscar dados solo mais recentes
    latest_soil = unity_soil_data.find_one(
        {"unity_id": unity_id},
        sort=[("timestamp", -1)]
    )
    
    # Buscar histórico de solo Unity para mapas
    soil_history = list(unity_soil_data.find(
        {"unity_id": unity_id}
    ).sort("timestamp", -1).limit(20))
    
    return {
        "status": "success",
        "unity_id": unity_id,
        "profile": profile,
        "latest_soil_data": latest_soil,
        "soil_history": soil_history,
        "dashboard_data": {
            "nome": profile["dados_pessoais"]["nome"],
            "propriedade": profile["propriedade"].get("nome", "N/A"),
            "area": profile["propriedade"].get("area_hectares", 0),
            "soil_health": calculate_soil_health(latest_soil) if latest_soil else 50
        }
    }

@app.get("/unity/ids")
def list_ids():
    profiles = list(unity_profiles.find({}, {"_id": 1}))
    unity_ids = [p["_id"] for p in profiles]
    
    return {
        "status": "success",
        "total_ids": len(unity_ids),
        "unity_ids": unity_ids
    }

@app.get("/unity/monitoring/{unity_id}")
def get_monitoring_data(unity_id: str, period: str = "24h"):
    from datetime import datetime, timedelta
    
    # Validar usuário
    if not unity_profiles.find_one({"_id": unity_id}):
        raise HTTPException(status_code=404, detail="Unity ID não encontrado")
    
    # Calcular data limite baseada no período real
    now = datetime.utcnow()
    time_deltas = {
        "1h": timedelta(hours=1),
        "6h": timedelta(hours=6), 
        "24h": timedelta(hours=24),
        "7d": timedelta(days=7)
    }
    
    time_limit = now - time_deltas.get(period, timedelta(hours=24))
    
    # Buscar dados filtrados por timestamp real
    soil_data = list(unity_soil_data.find({
        "unity_id": unity_id,
        "timestamp": {"$gte": time_limit}
    }).sort("timestamp", -1))
    
    # Converter formato para frontend
    monitoring_data = []
    for item in soil_data:
        # Calcular status baseado nos parâmetros
        ph = item["soil_parameters"]["ph"]
        status = "ideal" if 6.0 <= ph <= 7.0 else "atencao" if 5.5 <= ph <= 7.5 else "critico"
        
        monitoring_data.append({
            "hora": item["timestamp"].strftime("%H:%M"),
            "ph": item["soil_parameters"]["ph"],
            "umidade": item["soil_parameters"]["umidade"],
            "temp": item["soil_parameters"]["temperatura"],
            "salinidade": item["soil_parameters"]["salinidade"],
            "condutividade": item["soil_parameters"]["condutividade"],
            "n": item["nutrients"]["nitrogenio"],
            "p": item["nutrients"]["fosforo"],
            "k": item["nutrients"]["potassio"],
            "status": status
        })
    
    return {
        "status": "success",
        "unity_id": unity_id,
        "period": period,
        "time_filter": {
            "from": time_limit.isoformat(),
            "to": now.isoformat(),
            "total_found": len(monitoring_data)
        },
        "data": monitoring_data
    }

@app.get("/unity/analise-ia/{unity_id}")
def analise_ia(unity_id: str):
    profile = unity_profiles.find_one({"_id": unity_id})
    if not profile:
        raise HTTPException(status_code=404, detail="Unity ID não encontrado")
    
    # Buscar dados de solo mais recentes
    latest_soil = unity_soil_data.find_one(
        {"unity_id": unity_id},
        sort=[("timestamp", -1)]
    )
    
    # Buscar histórico para análise de tendências
    soil_history = list(unity_soil_data.find(
        {"unity_id": unity_id}
    ).sort("timestamp", -1).limit(10))
    
    # Análise completa
    diagnostico = analyze_soil_complete(latest_soil, soil_history, profile)
    
    return {
        "status": "success",
        "unity_id": unity_id,
        "cultivo_principal": get_main_crop(profile),
        "diagnostico": diagnostico,
        "resumo": {
            "parametros_ideais": count_ideal_parameters(diagnostico["parametros"]),
            "total_parametros": len(diagnostico["parametros"]),
            "tendencia_geral": analyze_trend(soil_history),
            "nivel_sustentabilidade": calculate_sustainability(latest_soil, profile)
        }
    }

if __name__ == "__main__":
    print("EKKO Unity API - MongoDB Atlas")
    print(f"Banco: {DB_NAME}")
    print("Porta: 8002")
    print("Docs: http://127.0.0.1:8002/docs")
    print("Status: http://127.0.0.1:8002/unity/status")
    print("=" * 50)
    
    uvicorn.run(app, host=API_HOST, port=API_PORT, reload=API_DEBUG)


# ==============================================================================
# ==============================================================================
# ==                                                                          ==
# ==                   INÍCIO DO CÓDIGO DO CHATBOT EKKO                       ==
# ==                                                                          ==
# ==============================================================================
# ==============================================================================

# --- CONFIGURAÇÃO E INICIALIZAÇÃO DO EKKO ---

# Conexão com a IA Local (Ollama)
OLLAMA_API_URL = "http://localhost:11434/api/generate"

# Evento que executa as inicializações do Ekko quando o servidor FastAPI liga
@app.on_event("startup")
def startup_event_ekko():
    """Funções a serem executadas quando o servidor inicia."""
    tool.init_memory_db()
    tool.load_inmet_stations()
    tool.load_and_index_local_database()
    print("="*50)
    print("Módulos do Chatbot Ekko carregados com sucesso.")
    print("="*50)

# Novo modelo Pydantic para as requisições do chat
class ChatRequest(BaseModel):
    message: str
    history: Optional[list] = []
    coordinates: Optional[Dict[str, float]] = None

# --- FUNÇÃO DE COMUNICAÇÃO COM OLLAMA ---
def get_ollama_response_stream(prompt: str):
    """
    Função de baixo nível para enviar um prompt para o Llama 3 local e receber a resposta em tempo real (streaming).
    """
    try:
        # Formato de prompt específico para o Llama 3 para melhores resultados
        llama3_prompt = f"<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nVocê é Ekko, um assistente de IA especialista em agricultura.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>"
        payload = {"model": "llama3", "prompt": llama3_prompt, "stream": True}
        
        response = requests.post(OLLAMA_API_URL, json=payload, stream=True)
        response.raise_for_status()

        for chunk in response.iter_lines():
            if chunk:
                json_chunk = json.loads(chunk)
                # Envia um evento formatado para o frontend
                yield f'data: {json.dumps({"type": "chunk", "message": json_chunk.get("response", "")})}\n\n'
    except Exception as e:
        print(f"!!! ERRO no streaming com Ollama: {e}")
        yield f'data: {json.dumps({"type": "chunk", "message": "Ops, erro de comunicação com a IA local (Ollama)."})}\n\n'

# --- NOVO ENDPOINT: O CÉREBRO DO CHATBOT EKKO ---
@app.post("/api/chat/{unity_id}")
def chat(unity_id: str, request: ChatRequest):
    """
    Endpoint principal do chatbot Ekko. Recebe uma pergunta, busca contexto no MongoDB
    e usa o Agente de IA para gerar uma resposta.
    """
    user_message = request.message
    coordinates = request.coordinates
    formatted_history = "\n".join(request.history)
    
    latest_soil = unity_soil_data.find_one({"unity_id": unity_id}, sort=[("timestamp", -1)])
    contexto_do_jogador = f"Dados do solo mais recentes do jogador: {json.dumps(latest_soil, default=str)}" if latest_soil else "Nenhum dado de solo recente encontrado para este jogador."

    def stream_generation():
        try:
      
            status_message = "Analisando sua pergunta e buscando dados..."
            yield f'data: {json.dumps({"type": "status", "message": status_message})}\n\n'

            local_context = tool.local_database_search(user_message)
            web_context = tool.focused_web_search(user_message)
            weather_context = ""
            weather_keywords = ["clima", "tempo", "chuva", "geada", "temperatura", "previsão"]
            if coordinates and any(keyword in user_message.lower() for keyword in weather_keywords):
                weather_context = tool.get_inmet_forecast(lat=coordinates['latitude'], lon=coordinates['longitude'])
            
            long_term_memory = tool.recall_memories()

            final_prompt = prompts.MASTER_PROMPT.format(
                long_term_memory=long_term_memory,
                local_context=local_context + "\n\n" + contexto_do_jogador,
                web_context=web_context,
                weather_context=weather_context,
                history=formatted_history,
                user_message=user_message
            )

    
            yield from get_ollama_response_stream(final_prompt)

        except Exception as e:
            print(f"!!! ERRO CRÍTICO NO FLUXO DE CHAT: {e}")
            yield f'data: {json.dumps({"type": "chunk", "message": "Ocorreu um erro crítico no meu processamento."})}\n\n'

    return Response(stream_generation(), mimetype='text/event-stream')




