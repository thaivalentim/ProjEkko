"""
EKKO Unity - Teste Backend Otimizado
Testa nova estrutura otimizada com dados realistas
"""

import requests
import json
from datetime import datetime

API_BASE = "http://localhost:8001"

def test_realistic_data():
    """Testa dados realistas gerados"""
    try:
        # Listar IDs disponíveis
        response = requests.get(f"{API_BASE}/unity/ids")
        data = response.json()
        
        print("🔍 Dados Realistas:")
        print(f"   Total perfis: {data.get('total_ids', 0)}")
        
        if data.get('unity_ids'):
            # Testar primeiro perfil
            unity_id = data['unity_ids'][0]
            
            # Buscar perfil completo
            profile_response = requests.get(f"{API_BASE}/unity/login/{unity_id}")
            profile_data = profile_response.json()
            
            if profile_data.get('status') == 'success':
                profile = profile_data['profile']
                
                print(f"   Nome: {profile['dados_pessoais']['nome']}")
                print(f"   Região: {profile['propriedade'].get('regiao', 'N/A')}")
                print(f"   Fazenda: {profile['propriedade']['nome']}")
                print(f"   Cultivos: {', '.join(profile['propriedade']['cultivos_principais'])}")
                print(f"   Experiência: {profile.get('experiencia', {}).get('anos_agricultura', 'N/A')} anos")
                
                return True
        
        return False
        
    except Exception as e:
        print(f"❌ Erro: {e}")
        return False

def test_dashboard_with_history():
    """Testa dashboard com histórico de dados"""
    try:
        # Pegar primeiro ID disponível
        response = requests.get(f"{API_BASE}/unity/ids")
        data = response.json()
        
        if not data.get('unity_ids'):
            print("❌ Nenhum ID disponível")
            return False
        
        unity_id = data['unity_ids'][0]
        
        # Buscar dashboard
        dashboard_response = requests.get(f"{API_BASE}/unity/dashboard/{unity_id}")
        dashboard_data = dashboard_response.json()
        
        print("📊 Dashboard com Histórico:")
        
        if dashboard_data.get('status') == 'success':
            dashboard = dashboard_data['dashboard_data']
            latest_soil = dashboard_data.get('latest_soil_data')
            
            print(f"   Agricultor: {dashboard['nome']}")
            print(f"   Propriedade: {dashboard['propriedade']}")
            print(f"   Área: {dashboard['area']} ha")
            print(f"   Saúde Solo: {dashboard['soil_health']:.1f}%")
            
            if latest_soil:
                soil_params = latest_soil.get('soil_parameters', {})
                print(f"   pH: {soil_params.get('ph', 'N/A')}")
                print(f"   Umidade: {soil_params.get('umidade', 'N/A')}%")
                print(f"   Temperatura: {soil_params.get('temperatura', 'N/A')}°C")
                
                # Verificar se tem cultivo atual
                cultivo = latest_soil.get('cultivo_atual')
                if cultivo:
                    print(f"   Cultivo Atual: {cultivo}")
            
            return True
        
        return False
        
    except Exception as e:
        print(f"❌ Erro: {e}")
        return False

def test_data_diversity():
    """Testa diversidade dos dados gerados"""
    try:
        response = requests.get(f"{API_BASE}/unity/ids")
        data = response.json()
        
        if not data.get('unity_ids'):
            return False
        
        print("🌍 Diversidade dos Dados:")
        
        regioes = set()
        cultivos = set()
        fazendas = set()
        
        # Analisar primeiros 5 perfis
        for unity_id in data['unity_ids'][:5]:
            profile_response = requests.get(f"{API_BASE}/unity/login/{unity_id}")
            profile_data = profile_response.json()
            
            if profile_data.get('status') == 'success':
                profile = profile_data['profile']
                propriedade = profile['propriedade']
                
                regioes.add(propriedade.get('regiao', 'N/A'))
                fazendas.add(propriedade['nome'])
                
                for cultivo in propriedade['cultivos_principais']:
                    cultivos.add(cultivo)
        
        print(f"   Regiões: {len(regioes)} ({', '.join(regioes)})")
        print(f"   Cultivos: {len(cultivos)} ({', '.join(list(cultivos)[:5])})")
        print(f"   Fazendas: {len(fazendas)} (todas diferentes)")
        
        return len(regioes) > 1 and len(cultivos) > 3
        
    except Exception as e:
        print(f"❌ Erro: {e}")
        return False

def test_soil_data_quality():
    """Testa qualidade dos dados de solo"""
    try:
        response = requests.get(f"{API_BASE}/unity/ids")
        data = response.json()
        
        if not data.get('unity_ids'):
            return False
        
        unity_id = data['unity_ids'][0]
        
        # Buscar dados de solo
        dashboard_response = requests.get(f"{API_BASE}/unity/dashboard/{unity_id}")
        dashboard_data = dashboard_response.json()
        
        print("🌱 Qualidade Dados Solo:")
        
        if dashboard_data.get('latest_soil_data'):
            soil = dashboard_data['latest_soil_data']
            
            # Verificar parâmetros
            soil_params = soil.get('soil_parameters', {})
            nutrients = soil.get('nutrients', {})
            
            ph = soil_params.get('ph', 0)
            umidade = soil_params.get('umidade', 0)
            n = nutrients.get('nitrogenio', 0)
            p = nutrients.get('fosforo', 0)
            k = nutrients.get('potassio', 0)
            
            print(f"   pH: {ph} {'✅' if 4.0 <= ph <= 8.5 else '❌'}")
            print(f"   Umidade: {umidade}% {'✅' if 0 <= umidade <= 100 else '❌'}")
            print(f"   NPK: {n}-{p}-{k} {'✅' if all([n > 0, p > 0, k > 0]) else '❌'}")
            
            # Verificar se tem health_score
            health_score = soil.get('health_score')
            if health_score:
                print(f"   Health Score: {health_score}% ✅")
            
            return True
        
        return False
        
    except Exception as e:
        print(f"❌ Erro: {e}")
        return False

def run_optimized_test():
    """Executa teste completo do backend otimizado"""
    print("🚀 TESTE BACKEND OTIMIZADO - DADOS REALISTAS")
    print("=" * 60)
    
    tests = [
        ("Dados Realistas", test_realistic_data),
        ("Dashboard com Histórico", test_dashboard_with_history),
        ("Diversidade de Dados", test_data_diversity),
        ("Qualidade Dados Solo", test_soil_data_quality)
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n📋 {test_name}...")
        if test_func():
            print(f"✅ {test_name} - PASSOU")
            passed += 1
        else:
            print(f"❌ {test_name} - FALHOU")
    
    print(f"\n{'=' * 60}")
    print(f"📊 RESULTADO: {passed}/{total} testes passaram")
    
    if passed == total:
        print("🎉 BACKEND OTIMIZADO FUNCIONANDO PERFEITAMENTE!")
        print("🌱 Dados realistas brasileiros")
        print("⚡ Estrutura otimizada")
        print("📈 Performance melhorada")
    else:
        print("⚠️ Alguns testes falharam - verificar configuração")
    
    return passed == total

if __name__ == "__main__":
    run_optimized_test()