"""
EKKO Unity - API com MongoDB Atlas
Usando sua connection string existente
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from typing import Dict, Any, Optional
from datetime import datetime
import uuid
import uvicorn
import os
from dotenv import load_dotenv

# Carregar .env
load_dotenv()

# MongoDB Atlas
MONGO_URI = os.getenv("UNITY_MONGO_URI", "mongodb+srv://valentimthaiza:Lildashboard13_@projekko.jaiz3jf.mongodb.net/")
DB_NAME = os.getenv("UNITY_MONGO_DB_NAME", "EKKOnUnity")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# Collections (usando as que você já tem)
unity_profiles = db["Python_userData"]  # Reutilizar collection existente
unity_soil_data = db["Unity_soilData"]   # Usar collection Unity existente

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
        raise HTTPException(status_code=404, detail="Unity ID não encontrado")
    
    return {
        "status": "success",
        "unity_id": unity_id,
        "profile": profile
    }

@app.post("/unity/soil/save/{unity_id}")
def save_soil(unity_id: str, soil: SoilData):
    # Verificar se perfil existe
    if not unity_profiles.find_one({"_id": unity_id}):
        raise HTTPException(status_code=404, detail="Unity ID não encontrado")
    
    soil_doc = {
        "_id": f"soil_{unity_id}_{int(datetime.utcnow().timestamp())}",
        "unity_id": unity_id,
        "timestamp": datetime.utcnow(),
        "soil_parameters": {
            "ph": soil.ph,
            "umidade": soil.umidade,
            "temperatura": soil.temperatura,
            "salinidade": soil.salinidade
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
    
    return {
        "status": "success",
        "unity_id": unity_id,
        "profile": profile,
        "latest_soil_data": latest_soil,
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

@app.post("/unity/create-test-data")
def create_test_data():
    """Cria dados de teste no Atlas"""
    unity_id = f"unity_{uuid.uuid4().hex[:12]}"
    
    # Perfil teste
    profile_doc = {
        "_id": unity_id,
        "dados_pessoais": {
            "nome": "João Silva Atlas",
            "email": "joao.atlas@ekko.com",
            "telefone": "(35) 99999-0001",
            "cpf": "123.456.789-01"
        },
        "propriedade": {
            "nome": "Fazenda Atlas EKKO",
            "area_hectares": 75.0,
            "localizacao": "Santa Rita do Sapucaí, MG",
            "cultivos_principais": ["Milho", "Soja", "Café"]
        },
        "unity_stats": {
            "total_sessions": 0,
            "best_score": 0,
            "total_playtime": 0
        },
        "created_at": datetime.utcnow(),
        "status": "active"
    }
    
    unity_profiles.insert_one(profile_doc)
    
    # Dados solo teste
    soil_doc = {
        "_id": f"soil_{unity_id}_{int(datetime.utcnow().timestamp())}",
        "unity_id": unity_id,
        "timestamp": datetime.utcnow(),
        "soil_parameters": {
            "ph": 6.4,
            "umidade": 58.0,
            "temperatura": 25.2,
            "salinidade": 380
        },
        "nutrients": {
            "nitrogenio": 52,
            "fosforo": 28,
            "potassio": 165
        },
        "player_actions": {
            "irrigacao": 70,
            "fertilizante_npk": {"N": 25, "P": 18, "K": 30}
        },
        "game_metrics": {
            "score": 920,
            "money_spent": 1450.75
        }
    }
    
    unity_soil_data.insert_one(soil_doc)
    
    return {
        "status": "success",
        "test_unity_id": unity_id,
        "message": "Dados de teste criados no MongoDB Atlas"
    }

def calculate_soil_health(soil_data: Optional[Dict]) -> float:
    if not soil_data:
        return 50.0
    
    soil_params = soil_data.get("soil_parameters", {})
    score = 0
    
    # pH
    ph = soil_params.get("ph", 7.0)
    if 6.0 <= ph <= 7.0:
        score += 25
    elif 5.5 <= ph <= 7.5:
        score += 15
    
    # Umidade
    umidade = soil_params.get("umidade", 50)
    if 40 <= umidade <= 60:
        score += 25
    elif 30 <= umidade <= 70:
        score += 15
    
    # Salinidade
    salinidade = soil_params.get("salinidade", 500)
    if salinidade < 800:
        score += 25
    elif salinidade < 1200:
        score += 15
    
    # Nutrientes
    nutrients = soil_data.get("nutrients", {})
    n = nutrients.get("nitrogenio", 50)
    p = nutrients.get("fosforo", 25)
    k = nutrients.get("potassio", 150)
    
    if 20 <= n <= 100:
        score += 8
    if 15 <= p <= 50:
        score += 8
    if 100 <= k <= 250:
        score += 9
    
    return min(score, 100)

if __name__ == "__main__":
    print("🚀 EKKO Unity API - MongoDB Atlas")
    print(f"☁️ Banco: {DB_NAME}")
    print("🌐 Porta: 8001")
    print("📖 Docs: http://localhost:8001/docs")
    print("🧪 Criar dados teste: POST /unity/create-test-data")
    print("=" * 50)
    
    uvicorn.run(app, host="0.0.0.0", port=8001)