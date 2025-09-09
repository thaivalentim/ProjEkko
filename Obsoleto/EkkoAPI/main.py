from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from EkkoAPI.profile_management import router as profile_router
from EkkoAPI.soil_readings import router as soil_router
from EkkoAPI.auth import router as auth_router
from EkkoAPI.soil_analysis import SoilAnalysisAI
from pydantic import BaseModel, EmailStr, Field
from bson import ObjectId
from pymongo import MongoClient
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "EKKO_database")

if not MONGO_URI:
    raise ValueError("MONGO_URI não encontrada no arquivo .env")

try:
    client = MongoClient(MONGO_URI, tlsAllowInvalidCertificates=True)
    try:
        client.admin.command('ping')
        print("[OK] MongoDB conectado com sucesso")
    except Exception as ping_error:
        print(f"[AVISO] Problema na conexao MongoDB: {ping_error}")
        print("API iniciará mesmo assim")
    
    db = client[MONGO_DB_NAME]
    usuarios_collection = db["usuarios"]
except Exception as e:
    print(f"[ERRO] Erro critico MongoDB: {e}")
    client = None
    db = None
    usuarios_collection = None

app = FastAPI(title="API Ekko")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000", 
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "file://",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(soil_router)

soil_ai = SoilAnalysisAI()

def serialize_user(user) -> dict:
    user["_id"] = str(user["_id"])
    return user

class Usuario(BaseModel):
    nome: str = Field(..., min_length=1)
    email: EmailStr
    papel: str = Field(..., min_length=1)

@app.get("/")
def root():
    print("[INFO] Endpoint raiz acessado")
    try:
        mongodb_status = "connected" if db and usuarios_collection else "disconnected"
        return {
            "mensagem": "API Ekko está online!", 
            "status": "running",
            "mongodb": mongodb_status,
            "version": "1.0.0"
        }
    except Exception as e:
        print(f"[ERRO] Erro no endpoint raiz: {e}")
        return {
            "mensagem": "API Ekko está online!", 
            "status": "running",
            "mongodb": "error",
            "error": str(e)
        }

@app.get("/usuarios", response_model=List[dict])
def listar_usuarios():
    try:
        usuarios = list(usuarios_collection.find())
        return [serialize_user(u) for u in usuarios]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao listar usuários: {str(e)}")

@app.post("/usuarios", response_model=dict)
def criar_usuario(usuario: Usuario):
    try:
        novo = usuario.dict()
        result = usuarios_collection.insert_one(novo)
        novo["_id"] = str(result.inserted_id)
        return novo
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao criar usuário: {str(e)}")

@app.get("/usuarios/{usuario_id}", response_model=dict)
def obter_usuario(usuario_id: str):
    print(f"[INFO] Buscando usuario: {usuario_id}")
    try:
        if not ObjectId.is_valid(usuario_id):
            raise HTTPException(status_code=400, detail="ID inválido")
        usuario = usuarios_collection.find_one({"_id": ObjectId(usuario_id)})
        if not usuario:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        print(f"[OK] Usuario encontrado: {usuario.get('nome', 'N/A')}")
        return serialize_user(usuario)
    except HTTPException:
        raise
    except Exception as e:
        print(f"[ERRO] Erro ao obter usuario: {e}")
        raise HTTPException(status_code=500, detail=f"Erro ao obter usuário: {str(e)}")

@app.get("/diagnostico/{usuario_id}", response_model=dict)
def obter_diagnostico_solo(usuario_id: str):
    print(f"[IA] Gerando diagnostico para: {usuario_id}")
    try:
        if not ObjectId.is_valid(usuario_id):
            raise HTTPException(status_code=400, detail="ID inválido")
        
        usuario = usuarios_collection.find_one({"_id": ObjectId(usuario_id)})
        if not usuario:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        
        soil_collection = db["leituras_solo"]
        leituras = list(soil_collection.find({"usuario_id": ObjectId(usuario_id)}).sort("data_leitura", -1))
        
        for leitura in leituras:
            leitura["_id"] = str(leitura["_id"])
            leitura["usuario_id"] = str(leitura["usuario_id"])
        
        usuario_data = serialize_user(usuario)
        usuario_data["leituras_solo"] = leituras
        
        diagnostico = soil_ai.gerar_relatorio_completo(usuario_data)
        return diagnostico
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao gerar diagnóstico: {str(e)}")

@app.get("/analise-rapida/{usuario_id}", response_model=dict)
def analise_rapida_solo(usuario_id: str):
    try:
        if not ObjectId.is_valid(usuario_id):
            raise HTTPException(status_code=400, detail="ID inválido")
        
        usuario = usuarios_collection.find_one({"_id": ObjectId(usuario_id)})
        if not usuario:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        
        soil_collection = db["leituras_solo"]
        ultima_leitura = soil_collection.find_one(
            {"usuario_id": ObjectId(usuario_id)}, 
            sort=[("data_leitura", -1)]
        )
        
        if not ultima_leitura:
            raise HTTPException(status_code=404, detail="Nenhuma leitura encontrada")
        
        cultivo = usuario.get("propriedade", {}).get("cultivo_principal", "Soja")
        analise = soil_ai.analisar_leitura_individual(ultima_leitura, cultivo)
        
        return {
            "usuario": usuario.get("nome", ""),
            "fazenda": usuario.get("nome_fazenda", ""),
            "cultivo": cultivo,
            "analise": analise,
            "leitura_data": ultima_leitura.get("data_leitura")
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro na análise rápida: {str(e)}")