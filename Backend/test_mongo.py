# -*- coding: utf-8 -*-
"""Teste de conexão MongoDB"""
from database import client, unity_profiles, unity_soil_data, DB_NAME

print("=" * 50)
print("TESTE DE CONEXÃO MONGODB")
print("=" * 50)

try:
    # Testar conexão
    client.admin.command('ping')
    print("✅ Conexão OK")
    
    # Testar banco
    print(f"✅ Banco: {DB_NAME}")
    
    # Contar documentos
    profiles_count = unity_profiles.count_documents({})
    soil_count = unity_soil_data.count_documents({})
    
    print(f"✅ Perfis: {profiles_count}")
    print(f"✅ Dados de solo: {soil_count}")
    
    # Listar Unity IDs
    if profiles_count > 0:
        print("\n📋 Unity IDs disponíveis:")
        for profile in unity_profiles.find({}, {"_id": 1}).limit(5):
            print(f"  - {profile['_id']}")
    
    print("\n" + "=" * 50)
    print("✅ MONGODB FUNCIONANDO PERFEITAMENTE!")
    print("=" * 50)
    
except Exception as e:
    print(f"\n❌ ERRO: {e}")
    print("\nPossíveis causas:")
    print("1. Credenciais incorretas no .env")
    print("2. IP não autorizado no MongoDB Atlas")
    print("3. Cluster pausado/desligado")
    print("4. Sem conexão com internet")
