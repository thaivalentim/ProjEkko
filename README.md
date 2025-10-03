# 🌱 EKKO - Agricultura Gamificada

Sistema integrado que combina **simulação 3D** desenvolvida na Unity com **plataforma web** para ensinar agricultura sustentável através de gamificação e análise inteligente de solo.

## 🚀 Início Rápido

```bash
# 1. Backend
cd Backend
cp .env.example .env
pip install -r requirements_unity.txt
python main.py

# 2. Frontend
cd ../Frontend
# Abrir pages/index.html no navegador
```

**Acesso**: http://localhost:8002 | **Docs**: http://localhost:8002/docs

## 📁 Estrutura

```
ProjEkko/
├── Backend/           # 🚀 API + IA
│   ├── main.py        # FastAPI
│   ├── ai_analyzer.py # Sistema IA
│   ├── database.py    # MongoDB Atlas
│   └── .env           # Credenciais
├── Frontend/          # 🎨 Interface Web
│   ├── pages/         # HTML
│   ├── css/           # Estilos
│   └── js/            # JavaScript
└── Obsoleto/          # 📦 Versões antigas
```

## ✅ Funcionalidades

### 🚀 **Backend**
- **API FastAPI** com MongoDB Atlas
- **IA Avançada** - Análise de 9 parâmetros de solo
- **Autenticação** por Unity ID
- **Previsões** de colheita e sustentabilidade
- **Recomendações** personalizadas

### 🎨 **Frontend**
- **Dashboard Moderno** com 7 seções
- **Visualizações** interativas (mapas de calor, gráficos)
- **Design Responsivo** (desktop, tablet, mobile)
- **UX Otimizada** (loading, error handling)

### 🧠 **IA - 9 Parâmetros**
pH • Umidade • Temperatura • Salinidade • Condutividade • NPK • Performance

## 🔗 API Endpoints

**Base URL**: `http://localhost:8002`

## 📊 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/unity/status` | Status da API e banco |
| GET | `/unity/login/{user_id}` | Login por ID do usuário |
| GET | `/unity/dashboard/{user_id}` | Dados completos dashboard |
| POST | `/unity/soil/save/{user_id}` | Salvar dados da simulação |
| GET | `/unity/analise-ia/{user_id}` | Análise IA (9 parâmetros) |
| GET | `/unity/recreate-test-data` | Recriar dados teste |

## 🛠️ Stack Tecnológica

- **Backend**: Python, FastAPI, MongoDB Atlas
- **Frontend**: HTML5, CSS3, JavaScript, Chart.js
- **IA**: Análise agronômica brasileira
- **Design**: Glassmorphism moderno

## 🏆 Status

- ✅ **Backend** - API + IA completos
- ✅ **Frontend** - Dashboard moderno
- 🔧 **Simulação Unity** - Em desenvolvimento
- 🏆 **44ª Projete ETE FMC** - Feira tecnológica

---

**EKKO** - Agricultura Gamificada 🌱🎮  
**Equipe 34DS08** | **ETE FMC** | **Santa Rita do Sapucaí, MG**