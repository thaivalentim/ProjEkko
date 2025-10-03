# -*- coding: utf-8 -*-
from database import unity_profiles, unity_soil_data
from datetime import datetime

def criar_usuario_teste(unity_id):
    """Cria dados de teste para um Unity ID"""
    
    # Verificar se já existe
    if unity_profiles.find_one({"_id": unity_id}):
        print(f"Unity ID {unity_id} já existe!")
        return
    
    # Criar perfil
    profile = {
        "_id": unity_id,
        "dados_pessoais": {
            "nome": "Agricultor Teste",
            "email": "teste@ekko.com",
            "telefone": "11999999999",
            "cpf": "12345678900"
        },
        "propriedade": {
            "nome": "Fazenda Teste",
            "area_hectares": 50,
            "cultivo_principal": "Milho",
            "localizacao": "São Paulo, Brasil"
        },
        "unity_stats": {
            "total_sessions": 1,
            "best_score": 100,
            "total_playtime": 60
        },
        "created_at": datetime.utcnow(),
        "status": "active"
    }
    
    unity_profiles.insert_one(profile)
    print(f"✓ Perfil criado para {unity_id}")
    
    # Criar dados de solo
    soil = {
        "_id": f"soil_{unity_id}_{int(datetime.utcnow().timestamp())}",
        "unity_id": unity_id,
        "timestamp": datetime.utcnow(),
        "soil_parameters": {
            "ph": 6.5,
            "umidade": 45.0,
            "temperatura": 25.0,
            "salinidade": 0.3,
            "condutividade": 1.2,
            "densidade": 1.3,
            "materia_organica": 3.5
        },
        "nutrients": {
            "nitrogenio": 80.0,
            "fosforo": 40.0,
            "potassio": 60.0,
            "calcio": 500.0,
            "magnesio": 120.0,
            "enxofre": 20.0
        },
        "player_actions": {
            "irrigacao": 36.0,
            "fertilizante_npk": {
                "N": 32.0,
                "P": 8.0,
                "K": 18.0
            },
            "calagem": 0.5,
            "materia_organica_adicionada": 1.0
        },
        "game_metrics": {
            "score": 750,
            "money_spent": 240.0,
            "sustainability_index": 0.93,
            "productivity_estimate": 60
        },
        "cultivo_atual": "Milho",
        "estacao": "Crescimento",
        "health_score": 95
    }
    
    unity_soil_data.insert_one(soil)
    print(f"✓ Dados de solo criados para {unity_id}")
    
    print(f"\n✅ Dados de teste criados com sucesso!")
    print(f"Unity ID: {unity_id}")
    print(f"Nome: Agricultor Teste")
    print(f"Propriedade: Fazenda Teste (50 ha)")
    print(f"Cultivo: Milho")
    print(f"pH: 6.5 | Umidade: 45% | NPK: 80/40/60")

if __name__ == "__main__":
    # Criar dados para o Unity ID atual
    unity_id = "unity_bf87c29494e0"
    
    print(f"Criando dados de teste para: {unity_id}\n")
    criar_usuario_teste(unity_id)
