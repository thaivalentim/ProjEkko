"""
EKKO Unity - Limpar Banco
Remove dados duplicados antes de gerar novos
"""

from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("UNITY_MONGO_URI")
DB_NAME = os.getenv("UNITY_MONGO_DB_NAME", "EKKOnUnity")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

def clear_database():
    """Limpa collections Unity"""
    print("🧹 Limpando banco Unity...")
    
    # Limpar collections
    profiles_deleted = db["Python_userData"].delete_many({})
    soil_deleted = db["Unity_soilData"].delete_many({})
    
    print(f"✅ Perfis removidos: {profiles_deleted.deleted_count}")
    print(f"✅ Dados solo removidos: {soil_deleted.deleted_count}")
    print("✅ Banco limpo!")

if __name__ == "__main__":
    clear_database()