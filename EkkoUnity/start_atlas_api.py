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

@app.get("/unity/recreate-test-data")
def recreate_test_data():
    """Deleta e recria dados de teste com condutividade"""
    try:
        unity_id = "unity_test123"
        
        # Deletar dados existentes
        unity_profiles.delete_one({"_id": unity_id})
        unity_soil_data.delete_many({"unity_id": unity_id})
        
        # Criar perfil
        profile_doc = {
            "_id": unity_id,
            "dados_pessoais": {
                "nome": "João Silva Atlas",
                "email": "joao.atlas@ekko.com",
                "telefone": "(35) 99999-0001",
                "cpf": "999.888.777-66"
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
        
        # Criar dados solo com condutividade
        soil_doc = {
            "_id": f"soil_{unity_id}_{int(datetime.utcnow().timestamp())}",
            "unity_id": unity_id,
            "timestamp": datetime.utcnow(),
            "soil_parameters": {
                "ph": 6.4,
                "umidade": 58.0,
                "temperatura": 25.2,
                "salinidade": 380,
                "condutividade": 1.2
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
            "message": "Dados recriados com condutividade"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

@app.get("/unity/create-test-data")
def create_test_data():
    """Cria dados de teste no Atlas"""
    try:
        unity_id = "unity_test123"  # ID fixo para teste
        
        # Verificar se já existe
        existing = unity_profiles.find_one({"_id": unity_id})
        if not existing:
            # Perfil teste
            profile_doc = {
                "_id": unity_id,
                "dados_pessoais": {
                    "nome": "João Silva Atlas",
                    "email": "joao.atlas@ekko.com",
                    "telefone": "(35) 99999-0001",
                    "cpf": "999.888.777-66"
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
                "salinidade": 380,
                "condutividade": 1.2
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
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

# Endpoint IA avançado
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

def analyze_soil_complete(latest_soil, soil_history, profile):
    """Análise completa de solo com IA avançada"""
    if not latest_soil:
        return get_default_analysis()
    
    soil_params = latest_soil.get("soil_parameters", {})
    nutrients = latest_soil.get("nutrients", {})
    game_metrics = latest_soil.get("game_metrics", {})
    player_actions = latest_soil.get("player_actions", {})
    
    parametros = {}
    alertas_criticos = []
    
    # Análise pH
    ph = soil_params.get("ph", 7.0)
    ph_analysis = analyze_ph(ph)
    parametros["ph"] = ph_analysis
    if ph_analysis["status"] == "critico":
        alertas_criticos.append(f"pH crítico: {ph}")
    
    # Análise Umidade
    umidade = soil_params.get("umidade", 50)
    umidade_analysis = analyze_umidade(umidade)
    parametros["umidade"] = umidade_analysis
    if umidade_analysis["status"] == "critico":
        alertas_criticos.append(f"Umidade crítica: {umidade}%")
    
    # Análise Temperatura
    temp = soil_params.get("temperatura", 25)
    temp_analysis = analyze_temperatura(temp)
    parametros["temperatura"] = temp_analysis
    if temp_analysis["status"] == "critico":
        alertas_criticos.append(f"Temperatura crítica: {temp}°C")
    
    # Análise Salinidade
    sal = soil_params.get("salinidade", 400)
    sal_analysis = analyze_salinidade(sal)
    parametros["salinidade"] = sal_analysis
    if sal_analysis["status"] == "critico":
        alertas_criticos.append(f"Salinidade crítica: {sal} ppm")
    
    # Análise NPK
    n = nutrients.get("nitrogenio", 50)
    p = nutrients.get("fosforo", 25)
    k = nutrients.get("potassio", 150)
    
    parametros["nitrogenio"] = analyze_nutrient(n, "N", 20, 100)
    parametros["fosforo"] = analyze_nutrient(p, "P", 15, 50)
    parametros["potassio"] = analyze_nutrient(k, "K", 100, 250)
    
    # Análise Condutividade
    condutividade = soil_params.get("condutividade", 1.2)
    parametros["condutividade"] = analyze_condutividade(condutividade)
    if parametros["condutividade"]["status"] == "critico":
        alertas_criticos.append(f"Condutividade crítica: {condutividade} dS/m")
    
    # Análise Gaming Performance (último)
    score = game_metrics.get("score", 0)
    parametros["performance"] = analyze_gaming_performance(score, player_actions)
    
    # Saúde geral
    saude_geral = calculate_overall_health(parametros)
    
    # Recomendações personalizadas
    recomendacoes = generate_recommendations(parametros, profile, soil_history)
    
    return {
        "saude_geral": saude_geral,
        "alertas_criticos": alertas_criticos,
        "parametros": parametros,
        "recomendacao_geral": recomendacoes["geral"],
        "acoes_prioritarias": recomendacoes["acoes"],
        "previsao_colheita": predict_harvest(parametros, profile),
        "economia_estimada": calculate_savings(player_actions, parametros)
    }

def analyze_ph(ph):
    if 6.0 <= ph <= 7.0:
        return {
            "valor": ph, "faixa_ideal": "6.0-7.0", "status": "ideal",
            "impacto": "pH ideal para absorção de nutrientes",
            "sugestao": "Manter pH atual com monitoramento regular"
        }
    elif 5.5 <= ph < 6.0 or 7.0 < ph <= 7.5:
        return {
            "valor": ph, "faixa_ideal": "6.0-7.0", "status": "atencao",
            "impacto": "Absorção de nutrientes pode ser reduzida",
            "sugestao": "Aplicar calcário" if ph < 6.0 else "Aplicar enxofre"
        }
    else:
        return {
            "valor": ph, "faixa_ideal": "6.0-7.0", "status": "critico",
            "impacto": "Bloqueio severo de nutrientes",
            "sugestao": "Correção urgente de pH necessária"
        }

def analyze_umidade(umidade):
    if 40 <= umidade <= 70:
        return {
            "valor": umidade, "faixa_ideal": "40-70%", "status": "ideal",
            "impacto": "Umidade adequada para desenvolvimento",
            "sugestao": "Manter irrigação atual"
        }
    elif 30 <= umidade < 40 or 70 < umidade <= 80:
        return {
            "valor": umidade, "faixa_ideal": "40-70%", "status": "atencao",
            "impacto": "Estresse hídrico moderado",
            "sugestao": "Ajustar irrigação" if umidade < 40 else "Reduzir irrigação"
        }
    else:
        return {
            "valor": umidade, "faixa_ideal": "40-70%", "status": "critico",
            "impacto": "Estresse hídrico severo",
            "sugestao": "Correção urgente da irrigação"
        }

def analyze_temperatura(temp):
    if 20 <= temp <= 30:
        return {
            "valor": temp, "faixa_ideal": "20-30°C", "status": "ideal",
            "impacto": "Temperatura ideal para crescimento",
            "sugestao": "Condições térmicas adequadas"
        }
    elif 15 <= temp < 20 or 30 < temp <= 35:
        return {
            "valor": temp, "faixa_ideal": "20-30°C", "status": "atencao",
            "impacto": "Crescimento pode ser afetado",
            "sugestao": "Monitorar cobertura do solo"
        }
    else:
        return {
            "valor": temp, "faixa_ideal": "20-30°C", "status": "critico",
            "impacto": "Estresse térmico severo",
            "sugestao": "Implementar sombreamento ou cobertura"
        }

def analyze_salinidade(sal):
    if sal < 600:
        return {
            "valor": sal, "faixa_ideal": "< 600 ppm", "status": "ideal",
            "impacto": "Salinidade não limitante",
            "sugestao": "Manter práticas atuais"
        }
    elif 600 <= sal < 1000:
        return {
            "valor": sal, "faixa_ideal": "< 600 ppm", "status": "atencao",
            "impacto": "Início de estresse salino",
            "sugestao": "Aumentar lixiviação com irrigação"
        }
    else:
        return {
            "valor": sal, "faixa_ideal": "< 600 ppm", "status": "critico",
            "impacto": "Toxicidade por sal",
            "sugestao": "Drenagem urgente e lixiviação intensiva"
        }

def analyze_nutrient(valor, nutriente, min_ideal, max_ideal):
    if min_ideal <= valor <= max_ideal:
        status = "ideal"
        impacto = f"{nutriente} em níveis adequados"
        sugestao = "Manter adubação atual"
    elif valor < min_ideal:
        status = "critico" if valor < min_ideal * 0.5 else "atencao"
        impacto = f"Deficiência de {nutriente}"
        sugestao = f"Aplicar fertilizante rico em {nutriente}"
    else:
        status = "atencao"
        impacto = f"Excesso de {nutriente}"
        sugestao = f"Reduzir adubação com {nutriente}"
    
    return {
        "valor": valor, "faixa_ideal": f"{min_ideal}-{max_ideal}", "status": status,
        "impacto": impacto, "sugestao": sugestao
    }

def analyze_condutividade(condutividade):
    if condutividade <= 1.5:
        return {
            "valor": condutividade, "faixa_ideal": "< 1.5 dS/m", "status": "ideal",
            "impacto": "Condutividade adequada para cultivos",
            "sugestao": "Manter práticas atuais de irrigação"
        }
    elif condutividade <= 2.5:
        return {
            "valor": condutividade, "faixa_ideal": "< 1.5 dS/m", "status": "atencao",
            "impacto": "Início de estresse salino",
            "sugestao": "Melhorar drenagem e qualidade da água"
        }
    else:
        return {
            "valor": condutividade, "faixa_ideal": "< 1.5 dS/m", "status": "critico",
            "impacto": "Solo salino - prejudica absorção",
            "sugestao": "Lixiviação urgente e correção do solo"
        }

def analyze_gaming_performance(score, actions):
    if score > 800:
        status = "ideal"
        impacto = "Excelente performance no jogo"
        sugestao = "Continue com as estratégias atuais"
    elif score > 500:
        status = "atencao"
        impacto = "Performance moderada"
        sugestao = "Otimize o uso de recursos"
    else:
        status = "critico"
        impacto = "Performance baixa"
        sugestao = "Revise estratégias de manejo"
    
    return {
        "valor": score, "faixa_ideal": "> 800", "status": status,
        "impacto": impacto, "sugestao": sugestao
    }

def calculate_overall_health(parametros):
    scores = []
    for param in parametros.values():
        if param["status"] == "ideal":
            scores.append(100)
        elif param["status"] == "atencao":
            scores.append(70)
        else:
            scores.append(30)
    return sum(scores) / len(scores) if scores else 50

def generate_recommendations(parametros, profile, history):
    acoes = []
    
    # Ações baseadas em parâmetros críticos
    for nome, param in parametros.items():
        if param["status"] == "critico":
            acoes.append(f"🚨 {param['sugestao']} ({nome})")
    
    # Ações baseadas no perfil
    regiao = profile.get("propriedade", {}).get("regiao", "")
    if "Sul de Minas" in regiao:
        acoes.append("☕ Considere plantio de café na próxima safra")
    
    geral = "Solo necessita atenção em múltiplos parâmetros" if len(acoes) > 2 else "Solo em condições adequadas"
    
    return {"geral": geral, "acoes": acoes[:5]}  # Máximo 5 ações

def predict_harvest(parametros, profile):
    health_score = calculate_overall_health(parametros)
    area = profile.get("propriedade", {}).get("area_hectares", 50)
    
    if health_score > 80:
        return f"Produtividade estimada: {area * 8.5:.1f} toneladas (Excelente)"
    elif health_score > 60:
        return f"Produtividade estimada: {area * 6.2:.1f} toneladas (Boa)"
    else:
        return f"Produtividade estimada: {area * 4.1:.1f} toneladas (Baixa)"

def calculate_savings(actions, parametros):
    money_spent = actions.get("money_spent", 0)
    health_score = calculate_overall_health(parametros)
    
    if health_score > 80:
        savings = money_spent * 0.15
        return f"Economia potencial: R$ {savings:.2f} (Manejo eficiente)"
    else:
        extra_cost = money_spent * 0.25
        return f"Custo adicional estimado: R$ {extra_cost:.2f} (Correções necessárias)"

def get_default_analysis():
    return {
        "saude_geral": 50,
        "alertas_criticos": ["Sem dados de solo disponíveis"],
        "parametros": {},
        "recomendacao_geral": "Inicie o monitoramento do solo",
        "acoes_prioritarias": ["📊 Colete dados de solo"],
        "previsao_colheita": "Dados insuficientes",
        "economia_estimada": "Análise indisponível"
    }

def get_main_crop(profile):
    cultivos = profile.get("propriedade", {}).get("cultivos_principais", [])
    return cultivos[0] if cultivos else "Cultivo Geral"

def count_ideal_parameters(parametros):
    return sum(1 for p in parametros.values() if p["status"] == "ideal")

def analyze_trend(history):
    if len(history) < 3:
        return "Dados insuficientes"
    
    # Análise simples de tendência baseada em scores
    scores = [h.get("game_metrics", {}).get("score", 0) for h in history[:3]]
    if scores[0] > scores[-1]:
        return "Melhorando"
    elif scores[0] < scores[-1]:
        return "Declinando"
    else:
        return "Estável"

def calculate_sustainability(soil_data, profile):
    if not soil_data:
        return 50
    
    # Baseado em práticas sustentáveis
    score = 60  # Base
    
    # Bonus por irrigação eficiente
    actions = soil_data.get("player_actions", {})
    if actions.get("irrigacao", 0) < 80:
        score += 20
    
    # Bonus por uso moderado de fertilizantes
    npk = actions.get("fertilizante_npk", {})
    total_npk = sum(npk.values()) if npk else 0
    if total_npk < 100:
        score += 20
    
    return min(score, 100)

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
    print("EKKO Unity API - MongoDB Atlas")
    print(f"Banco: {DB_NAME}")
    print("Porta: 8002")
    print("Docs: http://127.0.0.1:8002/docs")
    print("Status: http://127.0.0.1:8002/unity/status")
    print("=" * 50)
    
    uvicorn.run(app, host="0.0.0.0", port=8002)