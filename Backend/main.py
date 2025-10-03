

# Imports do sistema e de bibliotecas
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional
from datetime import datetime, timedelta
from pymongo import MongoClient
from dotenv import load_dotenv
import uuid
import uvicorn
import os
import requests
import json

# Imports locais do seu projeto (garanta que estes ficheiros existem)
from database import unity_profiles, unity_soil_data, API_HOST, API_PORT, API_DEBUG, client, DB_NAME
from ai_analyzer import analyze_soil_complete, get_main_crop, count_ideal_parameters, analyze_trend, calculate_sustainability, calculate_soil_health

# Imports locais do Ekko
import tool
import prompts

# --- CONFIGURAÇÃO INICIAL E CONEXÕES ---
load_dotenv()
app = FastAPI(title="EKKO API - Atlas + IA Local", version="Final")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

# Conexão com a IA Local (Ollama)
OLLAMA_API_URL = "http://localhost:11434/api/generate"

# --- EVENTOS DE STARTUP DA API (PARA O EKKO) ---
@app.on_event("startup")
def startup_event_ekko():
    """Funções a serem executadas quando o servidor inicia."""
    tool.init_memory_db()
    tool.load_inmet_stations()
    tool.load_and_index_local_database()
    print("="*50)
    print("Módulos do Chatbot Ekko carregados com sucesso.")
    print("="*50)

# --- MODELOS Pydantic ---
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
    densidade: Optional[float] = 1.2
    materia_organica: Optional[float] = 3.5
    calcio: Optional[float] = 500
    magnesio: Optional[float] = 120
    enxofre: Optional[float] = 20
    player_actions: Optional[Dict[str, Any]] = None
    game_metrics: Optional[Dict[str, Any]] = None
    cultivo_atual: Optional[str] = "Milho"
    estacao: Optional[str] = "Crescimento"

class ChatRequest(BaseModel):
    message: str
    history: Optional[list] = []
    coordinates: Optional[Dict[str, float]] = None

class TitleRequest(BaseModel):
    history_text: str

# --- ENDPOINTS UNITY ---
@app.get("/unity/status")
def get_status():
    try:
        client.admin.command('ping')
        profiles_count = unity_profiles.count_documents({})
        soil_count = unity_soil_data.count_documents({})
        return {
            "status": "online", "database": "connected",
            "db_name": DB_NAME, "profiles": profiles_count, "soil_data": soil_count
        }
    except Exception as e:
        return {"status": "error", "database": "disconnected", "error": str(e)}

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
        "message": "Perfil criado no Atlas"
    }

@app.get("/unity/login/{unity_id}")
def login(unity_id: str):
    profile = unity_profiles.find_one({"_id": unity_id})
    if not profile:
        raise HTTPException(status_code=404, detail="ID não encontrado")
    return {"status": "success", "unity_id": unity_id, "profile": profile}

@app.post("/unity/soil/save/{unity_id}")
def save_soil(unity_id: str, soil: SoilData):
    if not unity_profiles.find_one({"_id": unity_id}):
        raise HTTPException(status_code=404, detail="ID não encontrado")
    
    default_actions = {
        "irrigacao": round(soil.umidade * 0.8, 2),
        "fertilizante_npk": {
            "N": round(soil.nitrogenio * 0.4, 2),
            "P": round(soil.fosforo * 0.2, 2),
            "K": round(soil.potassio * 0.3, 2)
        },
        "calagem": 0.5,
        "materia_organica_adicionada": 1.0
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
    return {"status": "success", "soil_id": str(result.inserted_id), "message": "Dados salvos no Atlas"}

@app.get("/unity/dashboard/{unity_id}")
def get_dashboard(unity_id: str):
    profile = unity_profiles.find_one({"_id": unity_id})
    if not profile:
        raise HTTPException(status_code=404, detail="ID não encontrado")
    
    # Buscar dados de solo mais recentes
    latest_soil = unity_soil_data.find_one({"unity_id": unity_id}, sort=[("timestamp", -1)])
    
    # Buscar histórico de solo
    soil_history = list(unity_soil_data.find({"unity_id": unity_id}).sort("timestamp", -1).limit(10))
    
    # Dados do dashboard
    dashboard_data = {
        "propriedade": profile.get("propriedade", {}).get("nome", "Fazenda Unity"),
        "area": profile.get("propriedade", {}).get("area_hectares", 0),
        "soil_health": latest_soil.get("health_score", 50) if latest_soil else 50
    }
    
    return {
        "status": "success",
        "profile": profile,
        "latest_soil_data": latest_soil,
        "soil_history": soil_history,
        "dashboard_data": dashboard_data
    }

@app.get("/unity/analise-ia/{unity_id}")
def get_analise_ia(unity_id: str):
    profile = unity_profiles.find_one({"_id": unity_id})
    if not profile:
        raise HTTPException(status_code=404, detail="ID não encontrado")
    
    latest_soil = unity_soil_data.find_one({"unity_id": unity_id}, sort=[("timestamp", -1)])
    if not latest_soil:
        raise HTTPException(status_code=404, detail="Nenhum dado de solo encontrado")
    
    try:
        # Buscar histórico de solo
        soil_history = list(unity_soil_data.find({"unity_id": unity_id}).sort("timestamp", -1).limit(5))
        
        # Usar o analisador de IA
        analise = analyze_soil_complete(latest_soil, soil_history, profile)
        
        return {
            "status": "success",
            "cultivo_principal": get_main_crop(profile),
            "diagnostico": analise,
            "resumo": {
                "parametros_ideais": count_ideal_parameters(analise.get("parametros", {})),
                "total_parametros": 9,
                "nivel_sustentabilidade": calculate_sustainability(latest_soil, profile)
            }
        }
    except Exception as e:
        # Fallback para análise simples
        return {
            "status": "success",
            "cultivo_principal": "Milho",
            "diagnostico": {
                "saude_geral": 75,
                "alertas_criticos": [],
                "parametros": {}
            },
            "resumo": {
                "parametros_ideais": 6,
                "total_parametros": 9,
                "nivel_sustentabilidade": 70
            }
        }

# --- FUNÇÃO DE COMUNICAÇÃO COM OLLAMA ---
def get_ollama_response(prompt: str, stream: bool = False):
    format_type = "json" if not stream else ""
    llama3_prompt = f"<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nVocê é Ekko, um assistente de IA.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>"
    payload = {"model": "llama3", "prompt": llama3_prompt, "stream": stream}
    if format_type:
        payload["format"] = format_type
    
    response = requests.post(OLLAMA_API_URL, json=payload, stream=stream)
    response.raise_for_status()
    return response

# --- ENDPOINTS DO CHATBOT ---
@app.post("/api/generate_title")
def generate_title(request: TitleRequest):
    try:
        final_prompt = prompts.TITLE_GENERATION_PROMPT.format(history_text=request.history_text)
        response = get_ollama_response(final_prompt, stream=False)
        response_data = response.json()
        title_json_str = response_data.get("response", "{}")
        title_data = json.loads(title_json_str)
        return {"title": title_data.get("title", "Conversa")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao gerar título: {e}")

@app.post("/api/chat/{unity_id}")
def chat(unity_id: str, request: ChatRequest):
    user_message = request.message
    def stream_generation():
        try:
            yield f'data: {json.dumps({"type": "status", "message": "Analisando..."})}\n\n'
            
            latest_soil = unity_soil_data.find_one({"unity_id": unity_id}, sort=[("timestamp", -1)])
            player_context = f"Dados do solo: {json.dumps(latest_soil, default=str)}" if latest_soil else ""
            
            local_context = tool.local_database_search(user_message)
            web_context = tool.focused_web_search(user_message)
            weather_context = ""
            if request.coordinates:
                weather_context = tool.get_inmet_forecast(lat=request.coordinates['latitude'], lon=request.coordinates['longitude'])
            long_term_memory = tool.recall_memories()
            
            final_prompt = prompts.MASTER_PROMPT.format(
                player_context=player_context, local_context=local_context,
                web_context=web_context, weather_context=weather_context,
                history="\n".join(request.history), user_message=user_message,
                long_term_memory=long_term_memory
            )
            
            response = get_ollama_response(final_prompt, stream=True)
            for chunk in response.iter_lines():
                if chunk:
                    json_chunk = json.loads(chunk)
                    yield f'data: {json.dumps({"type": "chunk", "message": json_chunk.get("response", "")})}\n\n'
        except Exception as e:
            yield f'data: {json.dumps({"type": "chunk", "message": f"Erro: {e}"})}\n\n'
    return StreamingResponse(stream_generation(), media_type="text/event-stream")

@app.get("/unity/recreate-test-data")
def recreate_test_data():
    """Criar dados de teste para demonstração"""
    try:
        # Limpar dados existentes
        unity_profiles.delete_many({"_id": "unity_test123"})
        unity_soil_data.delete_many({"unity_id": "unity_test123"})
        
        # Criar perfil de teste
        test_profile = {
            "_id": "unity_test123",
            "dados_pessoais": {
                "nome": "João Silva",
                "email": "joao@fazenda.com",
                "telefone": "(35) 99999-9999",
                "cpf": "123.456.789-00"
            },
            "propriedade": {
                "nome": "Fazenda São João",
                "area_hectares": 50,
                "localizacao": "Santa Rita do Sapucaí, MG",
                "cultivos_principais": ["Café", "Milho"]
            },
            "unity_stats": {
                "total_sessions": 12,
                "best_score": 850,
                "total_playtime": 720
            },
            "created_at": datetime.utcnow(),
            "status": "active"
        }
        
        # Inserir perfil
        unity_profiles.insert_one(test_profile)
        
        # Criar dados de solo de teste
        soil_data = {
            "_id": f"soil_unity_test123_{int(datetime.utcnow().timestamp())}",
            "unity_id": "unity_test123",
            "timestamp": datetime.utcnow(),
            "soil_parameters": {
                "ph": 6.5,
                "umidade": 55.0,
                "temperatura": 25.0,
                "salinidade": 400.0,
                "condutividade": 1.2
            },
            "nutrients": {
                "nitrogenio": 120.0,
                "fosforo": 80.0,
                "potassio": 150.0
            },
            "game_metrics": {
                "score": 750,
                "money_spent": 240.0,
                "sustainability_index": 0.75
            },
            "cultivo_atual": "Milho",
            "health_score": 75
        }
        
        unity_soil_data.insert_one(soil_data)
        
        return {
            "status": "success",
            "message": "Dados de teste criados",
            "test_unity_id": "unity_test123"
        }
        
    except Exception as e:
        return {
            "status": "error",
            "message": f"Erro: {str(e)}"
        }

@app.get("/unity/monitoring/{unity_id}")
def get_monitoring_data(unity_id: str, period: str = "24h"):
    """Endpoint para dados de monitoramento em tempo real"""
    profile = unity_profiles.find_one({"_id": unity_id})
    if not profile:
        raise HTTPException(status_code=404, detail="ID não encontrado")
    
    # Calcular período baseado no parâmetro
    now = datetime.utcnow()
    if period == "1h":
        start_time = now - timedelta(hours=1)
    elif period == "6h":
        start_time = now - timedelta(hours=6)
    elif period == "7d":
        start_time = now - timedelta(days=7)
    else:  # 24h default
        start_time = now - timedelta(hours=24)
    
    # Buscar dados de solo no período
    soil_data = list(unity_soil_data.find({
        "unity_id": unity_id,
        "timestamp": {"$gte": start_time}
    }).sort("timestamp", -1))
    
    # Formatar dados para o frontend
    formatted_data = []
    for item in soil_data:
        soil_params = item.get("soil_parameters", {})
        nutrients = item.get("nutrients", {})
        timestamp = item.get("timestamp", now)
        
        # Determinar status baseado no pH
        ph = soil_params.get("ph", 0)
        if 6.0 <= ph <= 7.0:
            status = "ideal"
        elif 5.5 <= ph <= 7.5:
            status = "atencao"
        else:
            status = "critico"
        
        formatted_data.append({
            "hora": timestamp.strftime("%H:%M"),
            "ph": round(ph, 1),
            "umidade": round(soil_params.get("umidade", 0), 1),
            "temp": round(soil_params.get("temperatura", 0), 1),
            "salinidade": round(soil_params.get("salinidade", 0), 0),
            "condutividade": round(soil_params.get("condutividade", 0), 2),
            "n": round(nutrients.get("nitrogenio", 0), 1),
            "p": round(nutrients.get("fosforo", 0), 1),
            "k": round(nutrients.get("potassio", 0), 1),
            "status": status
        })
    
    return {
        "status": "success",
        "data": formatted_data,
        "period": period,
        "total_records": len(formatted_data)
    }



# --- INICIALIZAÇÃO DO SERVIDOR ---
if __name__ == "__main__":
    print("=" * 50)
    print("EKKO API - MongoDB Atlas & IA Local")
    print(f"Banco: {DB_NAME}")
    print(f"Porta: {API_PORT}")
    print(f"Docs: http://{API_HOST}:{API_PORT}/docs")
    print(f"Status: http://{API_HOST}:{API_PORT}/unity/status")
    print("=" * 50)
    
    uvicorn.run("main:app", host=API_HOST, port=API_PORT, reload=API_DEBUG)

