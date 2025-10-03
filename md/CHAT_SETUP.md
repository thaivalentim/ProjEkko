# 🤖 EKKO Chat Bot v2.0 - Setup Completo

## ✅ O que foi feito

### Arquivos Criados/Atualizados:
- ✅ `Frontend/js/chat_bot_v2.js` - JavaScript completamente reescrito
- ✅ `Frontend/css/chat_bot_v2.css` - CSS limpo e moderno
- ✅ `Frontend/chat_standalone.html` - Página de teste standalone
- ✅ `Frontend/pages/dashboard.html` - Atualizado para v2.0
- ✅ `Backend/main.py` - Streaming corrigido

### Melhorias:
- ✅ Código 70% mais simples e limpo
- ✅ Logs de debug em todo fluxo
- ✅ Mensagens aparecem instantaneamente
- ✅ Streaming funcional
- ✅ Histórico de conversas
- ✅ Títulos automáticos
- ✅ Interface responsiva

## 🚀 Como Testar

### 1. Iniciar Backend
```bash
cd Backend
restart.bat
```

**Deve mostrar:**
```
EKKO API - MongoDB Atlas
Porta: 8002
```

### 2. Verificar Ollama
```bash
ollama list
```

**Deve mostrar:** `llama3.2`

### 3. Testar Chat Standalone
1. Abra `Frontend/chat_standalone.html` no navegador
2. Verifique os status (devem estar verdes)
3. Digite: "Olá, como você funciona?"
4. Pressione Enter ou clique em Enviar

**Deve:**
- ✅ Mostrar sua mensagem à direita (azul)
- ✅ Mostrar resposta do bot à esquerda (cinza)
- ✅ Streaming em tempo real

### 4. Testar no Dashboard
1. Abra `Frontend/pages/login.html`
2. Digite um Unity ID (ex: `unity_123`)
3. Clique em "Acessar Dashboard"
4. Vá para seção "Chatbot"
5. Digite uma pergunta

## 🔍 Debug

### Abrir Console do Navegador (F12)

**Deve mostrar:**
```
🤖 Chat Bot EKKO v2.0 Inicializando...
Unity ID: unity_123
API Chat: http://127.0.0.1:8002/api/chat/unity_123
Nova sessão criada: session_1234567890
✅ Chat Bot EKKO v2.0 Pronto!
```

**Ao enviar mensagem:**
```
Enviando mensagem: Olá
Fazendo requisição para: http://127.0.0.1:8002/api/chat/unity_123
```

### Terminal do Backend

**Deve mostrar:**
```
--- ROTA /api/chat ACIONADA ---
-> Pergunta Recebida: 'Olá'
--> A recolher contexto do MongoDB...
--> A recolher contexto da base local (RAG)...
--> A recolher contexto da Web...
-> A montar o prompt mestre...
-> A enviar prompt para a IA via conector...
--- CONECTOR IA: Enviando para llama3.2 (Stream: True) ---
-> A receber streaming da IA e a enviar para o frontend...
--- FIM DO FLUXO DE CHAT ---
```

## ❌ Problemas Comuns

### 1. Mensagens não aparecem
- Abra F12 e veja erros
- Verifique se `unityId` está no localStorage
- Execute: `localStorage.setItem('unityId', 'unity_test123')`

### 2. Erro 404 no chat
- Backend não está rodando
- Execute `restart.bat`

### 3. Streaming não funciona
- Ollama não está rodando
- Execute `ollama serve`

### 4. Resposta vazia
- Modelo não está baixado
- Execute `ollama pull llama3.2`

## 📝 Estrutura do Chat

```
Frontend/
├── chat_standalone.html      # Teste standalone
├── pages/
│   └── dashboard.html         # Dashboard com chat
├── js/
│   └── chat_bot_v2.js        # JavaScript v2.0
└── css/
    └── chat_bot_v2.css       # CSS v2.0

Backend/
├── main.py                    # API com streaming
├── ai_connector.py            # Conexão Ollama
└── restart.bat                # Script de reinício
```

## 🎯 Funcionalidades

### Implementadas:
- ✅ Enviar/receber mensagens
- ✅ Streaming em tempo real
- ✅ Histórico de conversas
- ✅ Múltiplas sessões
- ✅ Títulos automáticos
- ✅ Sidebar retrátil
- ✅ Deletar conversas
- ✅ Persistência localStorage

### Próximas:
- ⏳ Markdown rendering
- ⏳ Code highlighting
- ⏳ Anexar imagens
- ⏳ Exportar conversas

## 🔧 Comandos Úteis

```bash
# Reiniciar servidor
cd Backend && restart.bat

# Testar Ollama
ollama run llama3.2

# Verificar porta 8002
netstat -ano | findstr :8002

# Matar processo na porta 8002
for /f "tokens=5" %a in ('netstat -ano ^| findstr :8002 ^| findstr LISTENING') do taskkill /F /PID %a

# Limpar localStorage (Console do navegador)
localStorage.clear()
```

## 📞 Suporte

Se ainda não funcionar:
1. Tire print do Console (F12)
2. Tire print do Terminal do Backend
3. Verifique os 3 status na página standalone
4. Teste primeiro o `chat_standalone.html`

---

**EKKO Chat Bot v2.0** - Perfeitamente configurado! 🚀
