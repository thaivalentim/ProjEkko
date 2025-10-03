# -*- coding: utf-8 -*-
import ai_connector

def test_title_generation():
    print("=== TESTE GERAÇÃO DE TÍTULO ===")
    
    message = "Como melhorar o pH do solo?"
    prompt = f"Gere um título curto (máximo 5 palavras) para esta pergunta sobre agricultura: '{message}'"
    
    try:
        response = ai_connector.get_ollama_response(prompt, stream=False)
        data = response.json()
        title = data.get('message', {}).get('content', 'Nova Conversa')
        
        # Limpar e encurtar o título
        title = title.strip().replace('"', '').replace("'", '')
        words = title.split()[:4]  # Máximo 4 palavras
        final_title = ' '.join(words)
        
        print(f"Pergunta: {message}")
        print(f"Título gerado: {final_title}")
        
        return final_title
    except Exception as e:
        print(f"Erro: {e}")
        return "Nova Conversa"

if __name__ == "__main__":
    test_title_generation()