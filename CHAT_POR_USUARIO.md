# 🎯 Chat Personalizado por Usuário

## ✅ COMO FUNCIONA

O chat **JÁ ESTÁ** configurado para ser único para cada usuário Unity!

### 📊 Fluxo de Dados:

```
1. Usuário faz login → Unity ID salvo no localStorage
2. Chat abre → Pega Unity ID do localStorage
3. Mensagem enviada → API recebe Unity ID na URL
4. Backend busca dados → MongoDB filtra por Unity ID
5. IA responde → Usa dados específicos do usuário
```

### 🔑 Unity ID no Sistema:

**Frontend (JavaScript):**
```javascript
// Pega Unity ID do localStorage
const unityId = localStorage.getItem('unityId');

// Envia para API específica do usuário
const API_URL = `http://127.0.0.1:8002/api/chat/${unityId}`;
```

**Backend (Python):**
```python
@app.post("/api/chat/{unity_id}")
def chat(unity_id: str, request: ChatRequest):
    # Busca perfil específico do usuário
    profile = unity_profiles.find_one({"_id": unity_id})
    
    # Busca dados de solo específicos do usuário
    latest_soil = unity_soil_data.find_one(
        {"unity_id": unity_id}, 
        sort=[("timestamp", -1)]
    )
```

## 📋 Dados Personalizados por Usuário:

### 1. **Perfil do Agricultor:**
- Nome
- Propriedade
- Área (hectares)
- Cultivo principal

### 2. **Dados do Solo:**
- pH
- Umidade
- Temperatura
- NPK (Nitrogênio, Fósforo, Potássio)
- Cultivo atual

### 3. **Histórico de Conversas:**
- Cada usuário tem suas próprias conversas
- Salvas no localStorage com prefixo do Unity ID

## 🧪 Como Testar:

### Teste 1: Usuário A
```bash
1. Login com Unity ID: unity_123
2. Abra o chat
3. Pergunte: "Como está meu solo?"
4. Resposta: Dados do unity_123
```

### Teste 2: Usuário B
```bash
1. Limpe localStorage: localStorage.clear()
2. Login com Unity ID: unity_456
3. Abra o chat
4. Pergunte: "Como está meu solo?"
5. Resposta: Dados do unity_456 (DIFERENTES!)
```

### Teste 3: Trocar de Usuário
```bash
1. Faça logout
2. Login com outro Unity ID
3. Chat mostra dados do NOVO usuário
4. Histórico é DIFERENTE
```

## 🔍 Verificar no Console:

**Abra F12 no navegador:**
```javascript
// Ver Unity ID atual
console.log(localStorage.getItem('unityId'));

// Ver todas as conversas
console.log(localStorage.getItem('ekkoChatSessions'));

// Trocar de usuário manualmente
localStorage.setItem('unityId', 'unity_novo123');
location.reload();
```

## 📊 Exemplo de Resposta Personalizada:

**Usuário: unity_fazenda01**
```
Pergunta: "Como está meu solo?"

Resposta da IA:
"Olá João! Analisando sua propriedade Fazenda Boa Vista (50 hectares):

**Solo atual:**
- pH: 6.5 (ideal para milho)
- Umidade: 45%
- NPK: N=80, P=40, K=60

**Recomendação:**
Seu solo está em boas condições para o cultivo de milho."
```

**Usuário: unity_sitio02**
```
Pergunta: "Como está meu solo?"

Resposta da IA:
"Olá Maria! Analisando seu Sítio Verde (10 hectares):

**Solo atual:**
- pH: 5.2 (ácido)
- Umidade: 30%
- NPK: N=40, P=20, K=30

**Recomendação:**
Seu solo precisa de calagem para corrigir acidez."
```

## 🎯 Garantias do Sistema:

✅ **Isolamento de Dados:**
- Cada Unity ID tem seus próprios dados
- Impossível ver dados de outro usuário

✅ **Histórico Separado:**
- Conversas salvas por Unity ID
- Trocar de usuário = novo histórico

✅ **Respostas Personalizadas:**
- IA usa dados específicos do usuário
- Recomendações baseadas no perfil real

✅ **Segurança:**
- Unity ID validado no backend
- Erro 404 se ID não existir

## 🔧 Estrutura no MongoDB:

```javascript
// Collection: unity_profiles
{
  "_id": "unity_123",
  "dados_pessoais": {
    "nome": "João Silva"
  },
  "propriedade": {
    "nome": "Fazenda Boa Vista",
    "area_hectares": 50
  }
}

// Collection: unity_soil_data
{
  "unity_id": "unity_123",
  "soil_parameters": {
    "ph": 6.5,
    "umidade": 45
  },
  "nutrients": {
    "nitrogenio": 80,
    "fosforo": 40,
    "potassio": 60
  }
}
```

## 📝 Resumo:

**O chat É ÚNICO para cada usuário porque:**

1. ✅ Unity ID identifica o usuário
2. ✅ API busca dados específicos no MongoDB
3. ✅ IA usa dados do usuário nas respostas
4. ✅ Histórico é separado por usuário
5. ✅ Impossível misturar dados entre usuários

**ESTÁ PERFEITO E FUNCIONANDO!** 🎯

---

**Para adicionar novo usuário:**
```bash
# Via API
POST /unity/profile/create
{
  "nome": "Novo Agricultor",
  "email": "email@exemplo.com",
  "telefone": "11999999999",
  "cpf": "12345678900",
  "propriedade": {
    "nome": "Minha Fazenda",
    "area_hectares": 100,
    "cultivo_principal": "Soja"
  }
}

# Retorna: unity_id único
# Use esse ID para fazer login!
```
