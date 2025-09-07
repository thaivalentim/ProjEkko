# 🌱 EKKO Unity - Sistema Integrado

Sistema Unity integrado com MongoDB Atlas para monitoramento de solo em tempo real.

## 🚀 Início Rápido

### **1. Instalar Dependências**
```bash
pip install -r requirements_unity.txt
```

### **2. Configurar MongoDB Atlas**
Arquivo `.env` já configurado com:
```
UNITY_MONGO_URI=mongodb+srv://valentimthaiza:Lildashboard13_@projekko.jaiz3jf.mongodb.net/
UNITY_MONGO_DB_NAME=EKKOnUnity
```

### **3. Popular Banco com Dados Teste**
```bash
python data_generator.py
```

### **4. Iniciar API Unity**
```bash
python start_atlas_api.py
```

### **5. Testar Sistema**
```bash
python test_atlas_api.py
```

**Acesso**: http://localhost:8001 | **Docs**: http://localhost:8001/docs

## 📊 Estrutura MongoDB Atlas

### **Collections**
- `Python_userData` - Perfis Unity com dados pessoais
- `Unity_soilData` - Dados de solo do jogo Unity

### **Estrutura Perfil**
```json
{
  "_id": "unity_abc123def456",
  "dados_pessoais": {
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "(35) 99999-9999",
    "cpf": "123.456.789-00"
  },
  "propriedade": {
    "nome": "Fazenda EKKO",
    "area_hectares": 50.0,
    "localizacao": "Santa Rita do Sapucaí, MG",
    "cultivos_principais": ["Milho", "Soja"]
  },
  "unity_stats": {
    "total_sessions": 0,
    "best_score": 0,
    "total_playtime": 0
  }
}
```

### **Estrutura Dados Solo**
```json
{
  "_id": "soil_unity_abc123_1234567890",
  "unity_id": "unity_abc123def456",
  "timestamp": "2025-09-07T14:49:23.609+00:00",
  "soil_parameters": {
    "ph": 6.2,
    "umidade": 55.0,
    "temperatura": 24.5,
    "salinidade": 450
  },
  "nutrients": {
    "nitrogenio": 45,
    "fosforo": 25,
    "potassio": 180
  },
  "player_actions": {
    "irrigacao": 65,
    "fertilizante_npk": {"N": 20, "P": 15, "K": 25}
  },
  "game_metrics": {
    "score": 850,
    "money_spent": 1200.50
  }
}
```

## 📡 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/unity/status` | Status da API e banco |
| POST | `/unity/profile/create` | Criar perfil Unity |
| GET | `/unity/login/{unity_id}` | Login por Unity ID |
| POST | `/unity/soil/save/{unity_id}` | Salvar dados solo Unity |
| GET | `/unity/dashboard/{unity_id}` | Dashboard completo |
| GET | `/unity/ids` | Listar todos Unity IDs |
| POST | `/unity/create-test-data` | Criar dados teste |

## 🎮 Sistema de Login

### **Login Simples por ID**
1. Usuário digita Unity ID no site
2. Sistema valida ID no MongoDB Atlas
3. Retorna perfil completo + dados solo

### **IDs de Teste**
Após executar `data_generator.py`:
```
unity_abc123def456  # Perfil teste fixo
unity_def456ghi789  # Perfil aleatório 1
unity_ghi789jkl012  # Perfil aleatório 2
```

## 🔧 Integração Unity Game

### **Enviar Dados Solo**
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
    "fertilizante_npk": {"N": 20, "P": 15, "K": 25}
  },
  "game_metrics": {
    "score": 850,
    "money_spent": 1200.50
  }
}
```

### **Resposta**
```json
{
  "status": "success",
  "soil_id": "soil_unity_abc123_1234567890",
  "message": "Dados salvos no Atlas"
}
```

## 🧪 Testes

### **Teste Completo**
```bash
python test_atlas_api.py
```

**Verifica:**
- ✅ Conexão MongoDB Atlas
- ✅ Criação de perfis
- ✅ Login por Unity ID
- ✅ Salvamento dados solo
- ✅ Dashboard completo

## 📈 Status do Projeto

| Componente | Status | Descrição |
|------------|--------|-----------|
| **MongoDB Atlas** | ✅ Funcionando | Banco configurado e testado |
| **API Unity** | ✅ Funcionando | Todos endpoints operacionais |
| **Sistema Login** | ✅ Funcionando | Login por Unity ID |
| **Dados Teste** | ✅ Funcionando | Gerador populando Atlas |
| **Testes** | ✅ Passando | Validação completa |
| **Documentação** | ✅ Atualizada | Guias e exemplos |

## 🎯 Próximos Passos

1. **Frontend Unity** - Páginas web para usar API
2. **Unity Game Integration** - Conectar jogo com API
3. **Monitoramento Tempo Real** - WebSocket para updates
4. **Análise IA** - Feedback inteligente dos dados

---

**EKKO Unity** - Sistema pronto para integração com jogo Unity 🎮