"""
EKKO Unity - Teste API Atlas
Testa API usando MongoDB Atlas
"""

import requests
import json

API_BASE = "http://localhost:8001"

def test_atlas_connection():
    """Testa conexão com Atlas"""
    try:
        response = requests.get(f"{API_BASE}/unity/status")
        data = response.json()
        
        print("🔍 Status MongoDB Atlas:")
        print(f"   Status: {data.get('status')}")
        print(f"   Database: {data.get('database')}")
        print(f"   DB Name: {data.get('db_name')}")
        print(f"   Perfis: {data.get('profiles')}")
        print(f"   Dados Solo: {data.get('soil_data')}")
        
        return data.get('status') == 'online'
    except Exception as e:
        print(f"❌ Erro: {e}")
        return False

def create_test_data():
    """Cria dados de teste no Atlas"""
    try:
        response = requests.post(f"{API_BASE}/unity/create-test-data")
        data = response.json()
        
        print("🧪 Criação dados teste:")
        print(f"   Status: {data.get('status')}")
        print(f"   Unity ID: {data.get('test_unity_id')}")
        
        return data.get('test_unity_id')
    except Exception as e:
        print(f"❌ Erro: {e}")
        return None

def test_login(unity_id):
    """Testa login"""
    try:
        response = requests.get(f"{API_BASE}/unity/login/{unity_id}")
        data = response.json()
        
        print("🔑 Teste Login:")
        print(f"   Status: {data.get('status')}")
        nome = data.get('profile', {}).get('dados_pessoais', {}).get('nome')
        print(f"   Nome: {nome}")
        
        return data.get('status') == 'success'
    except Exception as e:
        print(f"❌ Erro: {e}")
        return False

def test_dashboard(unity_id):
    """Testa dashboard"""
    try:
        response = requests.get(f"{API_BASE}/unity/dashboard/{unity_id}")
        data = response.json()
        
        print("📊 Teste Dashboard:")
        print(f"   Status: {data.get('status')}")
        dashboard = data.get('dashboard_data', {})
        print(f"   Nome: {dashboard.get('nome')}")
        print(f"   Propriedade: {dashboard.get('propriedade')}")
        print(f"   Saúde Solo: {dashboard.get('soil_health')}")
        
        return data.get('status') == 'success'
    except Exception as e:
        print(f"❌ Erro: {e}")
        return False

def run_atlas_test():
    """Executa teste completo Atlas"""
    print("🚀 TESTE EKKO UNITY - MONGODB ATLAS")
    print("=" * 50)
    
    # 1. Testar conexão Atlas
    if not test_atlas_connection():
        print("❌ Falha conexão Atlas!")
        print("💡 Verifique se API está rodando: python start_atlas_api.py")
        return False
    
    print()
    
    # 2. Criar dados teste
    unity_id = create_test_data()
    if not unity_id:
        print("❌ Falha criação dados teste!")
        return False
    
    print()
    
    # 3. Testar login
    if not test_login(unity_id):
        print("❌ Falha login!")
        return False
    
    print()
    
    # 4. Testar dashboard
    if not test_dashboard(unity_id):
        print("❌ Falha dashboard!")
        return False
    
    print()
    print("✅ TODOS OS TESTES ATLAS PASSARAM!")
    print(f"🔑 Unity ID criado: {unity_id}")
    print("☁️ Dados salvos no MongoDB Atlas!")
    print("🎯 Backend Unity funcionando com Atlas!")
    
    return True

if __name__ == "__main__":
    run_atlas_test()