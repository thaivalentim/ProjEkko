# Arquivo: ai_connector.py
import requests
import json

# A sua conexão com a IA Local (Ollama)
OLLAMA_API_URL = "http://localhost:11434/api/generate"

def get_ollama_response(prompt: str, stream: bool = False):
    print(f"--- CONECTOR IA: A preparar o prompt para o Llama 3 ---")
    format_type = "json" if not stream else ""
    
    # Formato de prompt específico para o Llama 3
    llama3_prompt = f"<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nVocê é Ekko, um assistente de IA.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>"
    payload = {"model": "llama3", "prompt": llama3_prompt, "stream": stream}
    if format_type: 
        payload["format"] = format_type
    
    print(f"--- CONECTOR IA: A enviar pedido para {OLLAMA_API_URL} (Stream: {stream}) ---")
    response = requests.post(OLLAMA_API_URL, json=payload, stream=stream)
    response.raise_for_status()
    print(f"--- CONECTOR IA: Resposta recebida do Ollama ---")
    return response