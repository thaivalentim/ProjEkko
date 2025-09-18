# 🌱 EKKO Unity - Backend

Sistema de IA avançado para análise de solo com integração Unity e MongoDB Atlas.

## 🚀 Início Rápido

```bash
# 1. Configurar ambiente
cp .env.example .env
# Editar .env com suas credenciais MongoDB

# 2. Instalar dependências
pip install -r requirements_unity.txt

# 3. Iniciar API
python main.py
```

**Acesso**: http://localhost:8002 | **Docs**: http://localhost:8002/docs

## 📁 Estrutura

```
Backend/
├── main.py              # 🚀 API Principal (FastAPI)
├── ai_analyzer.py       # 🧠 Sistema IA (9 parâmetros)
├── database.py          # 🗄️ MongoDB Atlas
├── constants.py         # 📋 Configurações
├── tools/               # 🛠️ Utilitários
│   └── monitor_simple.py
├── .env                 # 🔐 Credenciais
└── requirements_unity.txt
```

## 🧠 Sistema IA

Análise completa de **9 parâmetros** de solo:
- pH, Umidade, Temperatura
- Salinidade, Condutividade  
- NPK (Nitrogênio, Fósforo, Potássio)
- Performance Unity

## 📊 Endpoints Principais

| Método | Endpoint | Descrição |
|--------|----------|--------------|
| GET | `/unity/status` | Status da API |
| GET | `/unity/login/{unity_id}` | Login Unity |
| POST | `/unity/soil/save/{unity_id}` | Salvar dados |
| GET | `/unity/dashboard/{unity_id}` | Dashboard |
| GET | `/unity/analise-ia/{unity_id}` | Análise IA |

## 🛠️ Ferramentas

```bash
# Monitorar banco em tempo real
python tools/monitor_simple.py
```

## ⚙️ Configuração

Arquivo `.env`:
```env
UNITY_MONGO_URI=mongodb+srv://...
UNITY_MONGO_DB_NAME=EKKOnUnity
API_HOST=0.0.0.0
API_PORT=8002
API_DEBUG=False
```

## 🎯 Funcionalidades

- ✅ **API REST** completa com FastAPI
- ✅ **IA Avançada** - 9 parâmetros de solo
- ✅ **MongoDB Atlas** - Banco na nuvem
- ✅ **Integração Unity** - Recebe dados do jogo
- ✅ **Análise Inteligente** - Recomendações personalizadas
- ✅ **Documentação** - Swagger automático

---

**EKKO Unity Backend** - Sistema limpo e otimizado 🎯