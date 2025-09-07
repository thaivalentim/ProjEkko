# 📡 EKKO Unity - Documentação API

## 🌐 Base URL
```
http://localhost:8001
```

## 🔑 Autenticação
Não requer autenticação. Login simples por Unity ID.

## 📊 Endpoints

### **Status da API**
```http
GET /unity/status
```

**Resposta:**
```json
{
  "status": "online",
  "database": "connected",
  "db_name": "EKKOnUnity",
  "profiles": 6,
  "soil_data": 1
}
```

### **Criar Perfil Unity**
```http
POST /unity/profile/create
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "(35) 99999-9999",
  "cpf": "123.456.789-00",
  "propriedade": {
    "nome": "Fazenda EKKO",
    "area_hectares": 50.0,
    "localizacao": "Santa Rita do Sapucaí, MG",
    "cultivos_principais": ["Milho", "Soja"]
  }
}
```

**Resposta:**
```json
{
  "status": "success",
  "unity_id": "unity_abc123def456"
}
```

### **Login por Unity ID**
```http
GET /unity/login/{unity_id}
```

**Resposta:**
```json
{
  "status": "success",
  "unity_id": "unity_abc123def456",
  "profile": {
    "_id": "unity_abc123def456",
    "dados_pessoais": {...},
    "propriedade": {...},
    "unity_stats": {...}
  }
}
```

### **Salvar Dados Solo Unity**
```http
POST /unity/soil/save/{unity_id}
Content-Type: application/json

{
  "session_id": "session_123",
  "ph": 6.2,
  "umidade": 55.0,
  "temperatura": 24.5,
  "salinidade": 450,
  "nitrogenio": 45,
  "fosforo": 25,
  "potassio": 180,
  "player_actions": {
    "irrigacao": 65,
    "fertilizante_npk": {
      "N": 20,
      "P": 15,
      "K": 25
    }
  },
  "game_metrics": {
    "score": 850,
    "money_spent": 1200.50
  }
}
```

**Resposta:**
```json
{
  "status": "success",
  "soil_id": "soil_unity_abc123_1234567890"
}
```

### **Dashboard Completo**
```http
GET /unity/dashboard/{unity_id}
```

**Resposta:**
```json
{
  "status": "success",
  "unity_id": "unity_abc123def456",
  "profile": {...},
  "latest_soil_data": {...},
  "dashboard_data": {
    "nome": "João Silva",
    "propriedade": "Fazenda EKKO",
    "area": 50.0,
    "soil_health": 85.5
  }
}
```

### **Listar Unity IDs**
```http
GET /unity/ids
```

**Resposta:**
```json
{
  "status": "success",
  "total_ids": 6,
  "unity_ids": [
    "unity_abc123def456",
    "unity_def456ghi789",
    "unity_ghi789jkl012"
  ]
}
```

### **Criar Dados Teste**
```http
POST /unity/create-test-data
```

**Resposta:**
```json
{
  "status": "success",
  "test_unity_id": "unity_xyz789abc123",
  "message": "Dados de teste criados no MongoDB Atlas"
}
```

## ❌ Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 404 | Unity ID não encontrado |
| 422 | Dados inválidos |
| 500 | Erro interno do servidor |

## 🧪 Exemplos de Teste

### **cURL**
```bash
# Status
curl http://localhost:8001/unity/status

# Login
curl http://localhost:8001/unity/login/unity_abc123def456

# Dashboard
curl http://localhost:8001/unity/dashboard/unity_abc123def456
```

### **JavaScript**
```javascript
// Login Unity
async function loginUnity(unityId) {
    const response = await fetch(`http://localhost:8001/unity/login/${unityId}`);
    const data = await response.json();
    
    if (data.status === 'success') {
        console.log('Login OK:', data.profile.dados_pessoais.nome);
        return data;
    } else {
        console.error('Login falhou');
        return null;
    }
}

// Salvar dados solo
async function saveSoilData(unityId, soilData) {
    const response = await fetch(`http://localhost:8001/unity/soil/save/${unityId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(soilData)
    });
    
    return await response.json();
}
```

### **Python**
```python
import requests

# Login
response = requests.get('http://localhost:8001/unity/login/unity_abc123def456')
data = response.json()

if data['status'] == 'success':
    print(f"Login OK: {data['profile']['dados_pessoais']['nome']}")

# Salvar dados solo
soil_data = {
    "session_id": "test_session",
    "ph": 6.2,
    "umidade": 55.0,
    # ... outros parâmetros
}

response = requests.post(
    'http://localhost:8001/unity/soil/save/unity_abc123def456',
    json=soil_data
)
```

---

**API pronta para integração Unity Game e Frontend!** 🚀