# -*- coding: utf-8 -*-
import ai_connector

def test_llama():
    print("=== TESTE DO LLAMA ===")
    
    # 1. Testar conexão
    print("1. Testando conexao...")
    if ai_connector.test_ollama_connection():
        print("OK - Ollama conectado!")
    else:
        print("ERRO - Ollama offline! Execute: ollama serve")
        return
    
    # 2. Teste simples
    print("\n2. Teste simples...")
    try:
        response = ai_connector.get_ollama_response("Diga apenas 'Funcionando!'")
        data = response.json()
        content = data.get('message', {}).get('content', 'Erro')
        print(f"OK - Resposta: {content}")
    except Exception as e:
        print(f"ERRO - {e}")
    
    # 3. Teste agricultura
    print("\n3. Teste agricultura...")
    try:
        response = ai_connector.get_ollama_response("Como melhorar o pH do solo?")
        data = response.json()
        content = data.get('message', {}).get('content', 'Erro')
        print(f"OK - Resposta: {content[:100]}...")
    except Exception as e:
        print(f"ERRO - {e}")

if __name__ == "__main__":
    test_llama()