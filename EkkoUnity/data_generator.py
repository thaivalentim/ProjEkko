"""
EKKO Unity - Gerador de Dados Simples
Popula MongoDB Atlas com dados de teste
"""

from faker import Faker
import random
from datetime import datetime
from pymongo import MongoClient
import uuid
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB Atlas
MONGO_URI = os.getenv("UNITY_MONGO_URI")
DB_NAME = os.getenv("UNITY_MONGO_DB_NAME", "EKKOnUnity")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
unity_profiles = db["Python_userData"]
unity_soil_data = db["Unity_soilData"]

fake = Faker('pt_BR')

def generate_test_profile():
    """Gera perfil de teste fixo"""
    unity_id = f"unity_{uuid.uuid4().hex[:12]}"
    
    profile = {
        "_id": unity_id,
        "dados_pessoais": {
            "nome": "João Silva Teste",
            "email": "joao.teste@ekko.com",
            "telefone": "(35) 99999-9999",
            "cpf": "123.456.789-00"
        },
        "propriedade": {
            "nome": "Fazenda Teste EKKO",
            "area_hectares": 50.0,
            "localizacao": "Santa Rita do Sapucaí, MG",
            "cultivos_principais": ["Milho", "Soja", "Feijão"]
        },
        "unity_stats": {
            "total_sessions": 0,
            "best_score": 0,
            "total_playtime": 0
        },
        "created_at": datetime.utcnow(),
        "status": "active"
    }
    
    unity_profiles.insert_one(profile)
    
    # Dados de solo
    soil_doc = {
        "_id": f"soil_{unity_id}_{int(datetime.utcnow().timestamp())}",
        "unity_id": unity_id,
        "timestamp": datetime.utcnow(),
        "soil_parameters": {
            "ph": 6.2,
            "umidade": 55.0,
            "temperatura": 24.5,
            "salinidade": 450
        },
        "nutrients": {
            "nitrogenio": 45,
            "fosforo": 25,
            "potassio": 180
        },
        "player_actions": {
            "irrigacao": 65,
            "fertilizante_npk": {"N": 20, "P": 15, "K": 25}
        },
        "game_metrics": {
            "score": 850,
            "money_spent": 1200.50
        }
    }
    
    unity_soil_data.insert_one(soil_doc)
    
    return unity_id

def generate_random_profiles(count=5):
    """Gera perfis aleatórios"""
    created_ids = []
    
    for i in range(count):
        unity_id = f"unity_{uuid.uuid4().hex[:12]}"
        
        profile = {
            "_id": unity_id,
            "dados_pessoais": {
                "nome": fake.name(),
                "email": fake.email(),
                "telefone": fake.phone_number(),
                "cpf": fake.cpf()
            },
            "propriedade": {
                "nome": f"Fazenda {fake.last_name()}",
                "area_hectares": round(random.uniform(10.0, 200.0), 2),
                "localizacao": f"{random.choice(['Pouso Alegre', 'Varginha', 'Lavras'])}, MG",
                "cultivos_principais": random.sample(["Milho", "Soja", "Feijão", "Café"], 2)
            },
            "unity_stats": {
                "total_sessions": 0,
                "best_score": 0,
                "total_playtime": 0
            },
            "created_at": datetime.utcnow(),
            "status": "active"
        }
        
        unity_profiles.insert_one(profile)
        created_ids.append(unity_id)
    
    return created_ids

def populate_database():
    """Popula banco com dados de teste"""
    print("🚀 Populando MongoDB Atlas...")
    
    # Perfil teste fixo
    test_id = generate_test_profile()
    print(f"✅ Perfil teste: {test_id}")
    
    # Perfis aleatórios
    random_ids = generate_random_profiles(5)
    print(f"✅ Perfis aleatórios: {len(random_ids)}")
    
    print(f"\n🔑 IDs Unity para login:")
    print(f"1. Teste: {test_id}")
    for i, unity_id in enumerate(random_ids[:3]):
        print(f"{i+2}. {unity_id}")
    
    print(f"\n✅ Banco populado com sucesso!")

if __name__ == "__main__":
    populate_database()