# 🧪 TESTE DO CHAT EKKO

## ✅ Checklist Rápido

### 1. Backend Rodando
```bash
cd Backend
py main.py
```
**Deve mostrar:** `Porta: 8002`

### 2. Ollama Rodando
```bash
ollama list
```
**Deve mostrar:** `llama3.2`

### 3. Testar API
Abra: http://localhost:8002/docs
- Teste o endpoint `/api/chat/{unity_id}`

### 4. Abrir Frontend
1. Abra `Frontend/pages/login.html`
2. Digite um Unity ID (ex: `unity_123`)
3. Clique em "Acessar Dashboard"
4. Vá para a seção "Chatbot"

### 5. Testar Chat
Digite no chat:
- "Olá, como você funciona?"
- "Como melhorar o pH do solo?"
- "Qual fertilizante usar para milho?"

## 🔧 Correções Feitas

✅ Corrigido `localStorage.getItem("unityId")`
✅ Adicionado biblioteca `marked.js` para markdown
✅ Corrigido parsing do streaming (API de chat)
✅ Adicionado modal de confirmação
✅ Corrigido payload da API de título

## 🐛 Se não funcionar

1. **Abra o Console do Navegador** (F12)
   - Veja se há erros em vermelho
   
2. **Verifique o Terminal do Backend**
   - Veja se há erros quando envia mensagem

3. **Teste o Ollama**
   ```bash
   curl http://localhost:11434/api/tags
   ```

4. **Verifique o Unity ID**
   - Abra o Console (F12)
   - Digite: `localStorage.getItem("unityId")`
   - Deve mostrar seu ID

## 📝 Endpoints Importantes

- Chat: `POST /api/chat/{unity_id}`
- Título: `POST /api/generate_title`
- Status: `GET /unity/status`
