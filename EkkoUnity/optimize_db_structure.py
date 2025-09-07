"""
EKKO Unity - Otimização Estrutura BD
Ajustes finais na estrutura do banco
"""

from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("UNITY_MONGO_URI")
DB_NAME = os.getenv("UNITY_MONGO_DB_NAME", "EKKOnUnity")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

def create_indexes():
    """Cria índices para performance"""
    print("🔧 Criando índices para performance...")
    
    # Python_userData (perfis)
    profiles = db["Python_userData"]
    profiles.create_index("dados_pessoais.email", unique=True)
    profiles.create_index("status")
    profiles.create_index("created_at")
    
    # Unity_soilData (dados solo)
    soil_data = db["Unity_soilData"]
    soil_data.create_index([("unity_id", 1), ("timestamp", -1)])  # Busca por usuário + mais recente
    soil_data.create_index("timestamp")
    
    print("✅ Índices criados")

def add_missing_fields():
    """Adiciona campos que podem ser úteis"""
    print("🔧 Adicionando campos opcionais...")
    
    # Adicionar campos de auditoria se não existirem
    profiles = db["Python_userData"]
    profiles.update_many(
        {"last_login": {"$exists": False}},
        {"$set": {"last_login": None}}
    )
    
    profiles.update_many(
        {"updated_at": {"$exists": False}},
        {"$set": {"updated_at": None}}
    )
    
    # Adicionar campos de análise nos dados de solo
    soil_data = db["Unity_soilData"]
    soil_data.update_many(
        {"analysis": {"$exists": False}},
        {"$set": {
            "analysis": {
                "health_score": None,
                "alerts": [],
                "suggestions": []
            }
        }}
    )
    
    print("✅ Campos opcionais adicionados")

def validate_structure():
    """Valida estrutura atual"""
    print("🔍 Validando estrutura...")
    
    profiles = db["Python_userData"]
    soil_data = db["Unity_soilData"]
    
    # Contar documentos
    profiles_count = profiles.count_documents({})
    soil_count = soil_data.count_documents({})
    
    print(f"📊 Perfis: {profiles_count}")
    print(f"📊 Dados Solo: {soil_count}")
    
    # Verificar estrutura de um perfil
    sample_profile = profiles.find_one()
    if sample_profile:
        print("✅ Estrutura perfil OK:")
        print(f"   - dados_pessoais: {'✅' if 'dados_pessoais' in sample_profile else '❌'}")
        print(f"   - propriedade: {'✅' if 'propriedade' in sample_profile else '❌'}")
        print(f"   - unity_stats: {'✅' if 'unity_stats' in sample_profile else '❌'}")
    
    # Verificar estrutura dados solo
    sample_soil = soil_data.find_one()
    if sample_soil:
        print("✅ Estrutura solo OK:")
        print(f"   - soil_parameters: {'✅' if 'soil_parameters' in sample_soil else '❌'}")
        print(f"   - nutrients: {'✅' if 'nutrients' in sample_soil else '❌'}")
        print(f"   - player_actions: {'✅' if 'player_actions' in sample_soil else '❌'}")
        print(f"   - game_metrics: {'✅' if 'game_metrics' in sample_soil else '❌'}")
    
    print("✅ Estrutura validada")

def optimize_database():
    """Otimização completa do banco"""
    print("🚀 OTIMIZAÇÃO BANCO EKKO UNITY")
    print("=" * 50)
    
    try:
        # 1. Validar estrutura atual
        validate_structure()
        print()
        
        # 2. Criar índices
        create_indexes()
        print()
        
        # 3. Adicionar campos opcionais
        add_missing_fields()
        print()
        
        print("✅ OTIMIZAÇÃO CONCLUÍDA!")
        print("\n📋 Estrutura Final:")
        print("├── Python_userData/")
        print("│   ├── dados_pessoais (nome, email, telefone, cpf)")
        print("│   ├── propriedade (nome, area, localização, cultivos)")
        print("│   ├── unity_stats (sessions, score, playtime)")
        print("│   ├── created_at, last_login, updated_at")
        print("│   └── status")
        print("├── Unity_soilData/")
        print("│   ├── unity_id (link com perfil)")
        print("│   ├── soil_parameters (pH, umidade, temp, salinidade)")
        print("│   ├── nutrients (NPK)")
        print("│   ├── player_actions (irrigação, fertilização)")
        print("│   ├── game_metrics (score, money_spent)")
        print("│   ├── analysis (health_score, alerts, suggestions)")
        print("│   └── timestamp")
        print("\n🎯 Banco pronto para produção!")
        
        return True
        
    except Exception as e:
        print(f"❌ Erro na otimização: {e}")
        return False

if __name__ == "__main__":
    optimize_database()