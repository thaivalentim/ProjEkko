"""
EKKO - API Principal
FastAPI com MongoDB Atlas
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
from datetime import datetime
import uuid
import uvicorn
import random


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
    player_actions: Dict[str, Any]
    game_metrics: Dict[str, Any]

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
    
    soil_doc = {
        "_id": f"soil_{unity_id}_{int(datetime.utcnow().timestamp())}",
        "unity_id": unity_id,
        "timestamp": datetime.utcnow(),
        "soil_parameters": {
            "ph": soil.ph,
            "umidade": soil.umidade,
            "temperatura": soil.temperatura,
            "salinidade": soil.salinidade,
            "condutividade": soil.condutividade
        },
        "nutrients": {
            "nitrogenio": soil.nitrogenio,
            "fosforo": soil.fosforo,
            "potassio": soil.potassio
        },
        "player_actions": soil.player_actions,
        "game_metrics": soil.game_metrics
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

@app.get("/unity/recreate-test-data")
def recreate_test_data():
    import random
    
    # Buscar todos os perfis
    profiles = list(unity_profiles.find({}))
    
    if not profiles:
        return {"status": "error", "message": "Nenhum perfil encontrado"}
    
    # Criar dados de teste para cada perfil
    created_count = 0
    for profile in profiles:
        unity_id = profile["_id"]
        
        # Criar 3 registros de solo com condutividade
        for i in range(3):
            soil_doc = {
                "_id": f"soil_{unity_id}_{int(datetime.utcnow().timestamp())}_{i}",
                "unity_id": unity_id,
                "timestamp": datetime.utcnow(),
                "soil_parameters": {
                    "ph": round(random.uniform(5.5, 7.5), 1),
                    "umidade": round(random.uniform(30, 80), 0),
                    "temperatura": round(random.uniform(18, 35), 0),
                    "salinidade": round(random.uniform(200, 1000), 0),
                    "condutividade": round(random.uniform(0.8, 2.5), 1)
                },
                "nutrients": {
                    "nitrogenio": round(random.uniform(10, 120), 0),
                    "fosforo": round(random.uniform(5, 60), 0),
                    "potassio": round(random.uniform(80, 300), 0)
                },
                "player_actions": {
                    "irrigacao": round(random.uniform(40, 90), 0),
                    "fertilizante_npk": {"N": 20, "P": 10, "K": 15}
                },
                "game_metrics": {
                    "score": round(random.uniform(300, 950), 0),
                    "money_spent": round(random.uniform(100, 500), 2),
                    "sustainability_index": round(random.uniform(60, 95), 0)
                }
            }
            
            unity_soil_data.insert_one(soil_doc)
            created_count += 1
    
    return {
        "status": "success",
        "message": f"Criados {created_count} registros de solo com condutividade",
        "profiles_updated": len(profiles)
    }

if __name__ == "__main__":
    print("EKKO Unity API - MongoDB Atlas")
    print(f"Banco: {DB_NAME}")
    print("Porta: 8002")
    print("Docs: http://127.0.0.1:8002/docs")
    print("Status: http://127.0.0.1:8002/unity/status")
    print("=" * 50)
    
    uvicorn.run(app, host=API_HOST, port=API_PORT, reload=API_DEBUG)