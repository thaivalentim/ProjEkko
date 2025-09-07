"""
EKKO Unity - Gerador de Dados Realistas
Popula MongoDB Atlas com dados brasileiros diversos
"""

from faker import Faker
import random
from datetime import datetime, timedelta
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

# Faker brasileiro
fake = Faker('pt_BR')

# Dados regionais brasileiros
REGIOES_MG = {
    "Sul de Minas": {
        "cidades": ["Pouso Alegre", "Varginha", "Três Corações", "Lavras", "Santa Rita do Sapucaí"],
        "cultivos": ["Café", "Milho", "Soja", "Batata"],
        "solo_ph": (5.8, 6.5),
        "temperatura": (18, 28)
    },
    "Triângulo Mineiro": {
        "cidades": ["Uberlândia", "Uberaba", "Patos de Minas", "Araguari"],
        "cultivos": ["Soja", "Milho", "Sorgo", "Feijão"],
        "solo_ph": (6.0, 7.0),
        "temperatura": (20, 32)
    },
    "Zona da Mata": {
        "cidades": ["Juiz de Fora", "Viçosa", "Muriaé", "Cataguases"],
        "cultivos": ["Café", "Cana-de-açúcar", "Milho", "Feijão"],
        "solo_ph": (5.5, 6.2),
        "temperatura": (16, 26)
    }
}

NOMES_FAZENDAS = [
    "Fazenda Boa Vista", "Sítio São José", "Fazenda Santa Maria", "Rancho Alegre",
    "Fazenda Esperança", "Sítio Bela Vista", "Fazenda São João", "Chácara Primavera",
    "Fazenda Monte Verde", "Sítio Recanto", "Fazenda Progresso", "Rancho do Sol"
]

def generate_realistic_profile():
    """Gera perfil realista com dados regionais"""
    unity_id = f"unity_{uuid.uuid4().hex[:12]}"
    
    # Escolher região aleatória
    regiao_nome = random.choice(list(REGIOES_MG.keys()))
    regiao = REGIOES_MG[regiao_nome]
    
    # Dados pessoais realistas
    nome = fake.name()
    email = f"{nome.lower().replace(' ', '.')}.{random.randint(1970, 2000)}@{random.choice(['gmail.com', 'hotmail.com', 'yahoo.com.br'])}"
    
    profile = {
        "_id": unity_id,
        "dados_pessoais": {
            "nome": nome,
            "email": email,
            "telefone": fake.phone_number(),
            "cpf": fake.cpf(),
            "data_nascimento": fake.date_of_birth(minimum_age=25, maximum_age=65).isoformat(),
            "genero": random.choice(["Masculino", "Feminino"])
        },
        "propriedade": {
            "nome": random.choice(NOMES_FAZENDAS),
            "area_hectares": round(random.uniform(5.0, 500.0), 2),
            "localizacao": f"{random.choice(regiao['cidades'])}, MG",
            "regiao": regiao_nome,
            "tipo_solo": random.choice(["Latossolo Vermelho", "Argissolo", "Cambissolo"]),
            "cultivos_principais": random.sample(regiao['cultivos'], random.randint(2, 3)),
            "irrigacao_disponivel": random.choice([True, False]),
            "certificacoes": random.sample(["Orgânico", "Rainforest", "UTZ", "Fair Trade"], random.randint(0, 2))
        },
        "experiencia": {
            "anos_agricultura": random.randint(5, 40),
            "nivel_tecnologia": random.choice(["Básico", "Intermediário", "Avançado"]),
            "uso_defensivos": random.choice(["Convencional", "Reduzido", "Orgânico"])
        },
        "unity_stats": {
            "total_sessions": 0,
            "best_score": 0,
            "total_playtime": 0,
            "achievements": [],
            "nivel": "Iniciante"
        },
        "auditoria": {
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "last_login": None,
            "login_count": 0
        },
        "status": "active"
    }
    
    unity_profiles.insert_one(profile)
    
    # Gerar múltiplos dados de solo para histórico
    generate_soil_history(unity_id, regiao, profile["propriedade"]["cultivos_principais"])
    
    return unity_id, nome, regiao_nome

def generate_soil_history(unity_id, regiao, cultivos):
    """Gera histórico de dados de solo realistas"""
    base_date = datetime.utcnow() - timedelta(days=30)
    
    for i in range(random.randint(3, 8)):
        timestamp = base_date + timedelta(days=random.randint(0, 30))
        
        # Parâmetros baseados na região
        ph_range = regiao['solo_ph']
        temp_range = regiao['temperatura']
        
        # Variação sazonal
        season_factor = 0.9 + (i * 0.02)  # Melhoria gradual
        
        soil_doc = {
            "_id": f"soil_{unity_id}_{int(timestamp.timestamp())}_{i}_{random.randint(100, 999)}",
            "unity_id": unity_id,
            "timestamp": timestamp,
            "soil_parameters": {
                "ph": round(random.uniform(ph_range[0], ph_range[1]) * season_factor, 1),
                "umidade": round(random.uniform(35, 75) * season_factor, 1),
                "temperatura": round(random.uniform(temp_range[0], temp_range[1]), 1),
                "salinidade": random.randint(200, 1200),
                "condutividade": round(random.uniform(0.5, 2.5), 2),
                "densidade": round(random.uniform(1.1, 1.6), 2),
                "materia_organica": round(random.uniform(2.0, 8.0), 1)
            },
            "nutrients": {
                "nitrogenio": random.randint(20, 100),
                "fosforo": random.randint(10, 60),
                "potassio": random.randint(80, 300),
                "calcio": random.randint(400, 1500),
                "magnesio": random.randint(100, 400),
                "enxofre": random.randint(8, 40)
            },
            "player_actions": {
                "irrigacao": random.randint(30, 90),
                "fertilizante_npk": {
                    "N": random.randint(10, 40),
                    "P": random.randint(5, 25),
                    "K": random.randint(15, 45)
                },
                "calagem": round(random.uniform(0, 4.0), 1),
                "materia_organica_adicionada": round(random.uniform(0, 6.0), 1)
            },
            "game_metrics": {
                "score": random.randint(400, 1500),
                "money_spent": round(random.uniform(500, 3000), 2),
                "sustainability_index": round(random.uniform(0.3, 0.95), 2),
                "productivity_estimate": random.randint(40, 98)
            },
            "cultivo_atual": random.choice(cultivos),
            "estacao": random.choice(["Plantio", "Crescimento", "Floração", "Colheita"])
        }
        
        unity_soil_data.insert_one(soil_doc)

def generate_test_profile():
    """Gera perfil de teste fixo para desenvolvimento"""
    unity_id = "unity_teste_dev_001"
    
    # Remover se já existe
    unity_profiles.delete_one({"_id": unity_id})
    unity_soil_data.delete_many({"unity_id": unity_id})
    
    profile = {
        "_id": unity_id,
        "dados_pessoais": {
            "nome": "João Silva Desenvolvedor",
            "email": "dev.teste@ekko.com",
            "telefone": "(35) 99999-0001",
            "cpf": "123.456.789-01",
            "data_nascimento": "1985-05-15",
            "genero": "Masculino"
        },
        "propriedade": {
            "nome": "Fazenda Teste Desenvolvimento",
            "area_hectares": 75.5,
            "localizacao": "Santa Rita do Sapucaí, MG",
            "regiao": "Sul de Minas",
            "tipo_solo": "Latossolo Vermelho",
            "cultivos_principais": ["Café", "Milho", "Soja"],
            "irrigacao_disponivel": True,
            "certificacoes": ["Orgânico"]
        },
        "experiencia": {
            "anos_agricultura": 15,
            "nivel_tecnologia": "Avançado",
            "uso_defensivos": "Reduzido"
        },
        "unity_stats": {
            "total_sessions": 0,
            "best_score": 0,
            "total_playtime": 0,
            "achievements": [],
            "nivel": "Iniciante"
        },
        "auditoria": {
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "last_login": None,
            "login_count": 0
        },
        "status": "active"
    }
    
    unity_profiles.insert_one(profile)
    generate_soil_history(unity_id, REGIOES_MG["Sul de Minas"], ["Café", "Milho"])
    
    return unity_id

def populate_database(num_profiles=10):
    """Popula banco com dados realistas diversos"""
    print("🚀 Gerando dados realistas brasileiros...")
    
    # Perfil teste fixo
    test_id = generate_test_profile()
    print(f"✅ Perfil teste: {test_id}")
    
    # Perfis realistas
    created_profiles = []
    for i in range(num_profiles):
        unity_id, nome, regiao = generate_realistic_profile()
        created_profiles.append((unity_id, nome, regiao))
        print(f"✅ {i+1}. {nome} - {regiao}")
    
    print(f"\n🔑 IDs Unity para login:")
    print(f"1. TESTE: {test_id}")
    for i, (unity_id, nome, regiao) in enumerate(created_profiles[:4]):
        print(f"{i+2}. {unity_id} - {nome}")
    
    print(f"\n📊 Resumo:")
    print(f"   Perfis criados: {len(created_profiles) + 1}")
    print(f"   Dados solo: ~{(len(created_profiles) + 1) * 5}")
    print(f"   Regiões: {len(set(r[2] for r in created_profiles))}")
    print(f"\n✅ Banco populado com dados realistas!")

if __name__ == "__main__":
    populate_database()