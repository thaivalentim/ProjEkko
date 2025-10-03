# 🌱 EKKO - Agricultura Gamificada

Sistema integrado que combina **simulação 3D Unity**, **plataforma web** e **chatbot IA** para ensinar agricultura sustentável através de gamificação e análise inteligente de solo.

---

## 🚀 Início Rápido

```bash
# 1. Backend + Ollama
cd Backend
cp .env.example .env
pip install -r requirements_unity.txt
setup_llama.bat
python main.py

# 2. Frontend
cd ../Frontend
# Abrir pages/index.html no navegador
```

**Acesso**: http://localhost:8002 | **Docs**: http://localhost:8002/docs

---

## 📁 Estrutura do Projeto

```
ProjEkko/
├── Backend/                    # 🚀 API + IA + Chatbot
│   ├── main.py                 # FastAPI principal
│   ├── ai_analyzer.py          # Sistema IA (9 parâmetros)
│   ├── ai_connector.py         # Conector Ollama
│   ├── prompts.py              # Prompts chatbot
│   ├── tool.py                 # RAG + Web + Clima
│   ├── database.py             # MongoDB Atlas
│   ├── criar_dados_teste.py    # Criar dados teste
│   ├── verificar_dados.py      # Verificar dados
│   ├── data/                   # Base RAG + Memória
│   └── .env                    # Credenciais
├── Frontend/                   # 🎨 Interface Web
│   ├── pages/                  # HTML (index, login, dashboard)
│   ├── css/                    # Estilos (8 arquivos)
│   ├── js/                     # JavaScript (5 arquivos)
│   └── assets/                 # Imagens
└── Obsoleto/                   # 📦 Versões antigas
```

---

## ✅ Funcionalidades Completas

### 🚀 Backend
- ✅ **API FastAPI** com 10 endpoints REST
- ✅ **MongoDB Atlas** - Banco na nuvem
- ✅ **IA Avançada** - Análise de 9 parâmetros de solo
- ✅ **Chatbot Llama 3.2** - Via Ollama com streaming
- ✅ **RAG** - Base local de conhecimento agrícola
- ✅ **Busca Web** - DuckDuckGo para cotações
- ✅ **Clima INMET** - Previsões meteorológicas
- ✅ **Memória Persistente** - SQLite para contexto
- ✅ **Sessões Isoladas** - Por Unity ID
- ✅ **Documentação Swagger** - Automática

### 🎨 Frontend
- ✅ **Dashboard Moderno** - 8 seções interativas
- ✅ **Chatbot Interface** - Histórico + Streaming
- ✅ **Análise IA Visual** - Cards com status
- ✅ **Popup de Dicas** - Recomendações Ollama
- ✅ **Mapas de Calor** - Visualizações Chart.js
- ✅ **Monitoramento** - Tempo real
- ✅ **Design Responsivo** - Desktop/Tablet/Mobile
- ✅ **Glassmorphism** - Design moderno
- ✅ **Error Handling** - Completo
- ✅ **Loading States** - Feedback visual

### 🧠 IA - 9 Parâmetros de Solo
- pH do Solo
- Umidade (%)
- Temperatura (°C)
- Salinidade (ppm)
- Condutividade (dS/m)
- Nitrogênio (N) - mg/kg
- Fósforo (P) - mg/kg
- Potássio (K) - mg/kg
- Performance Unity (pontos)

### 🤖 Chatbot Llama 3.2
- ✅ Perguntas teóricas sobre agricultura
- ✅ Análise de dados específicos da fazenda
- ✅ Cotações e preços de mercado
- ✅ Previsões climáticas (INMET)
- ✅ Dicas de melhoria de solo
- ✅ Recomendações personalizadas
- ✅ Histórico de conversas
- ✅ Títulos automáticos (IA)
- ✅ Sessões isoladas por usuário
- ✅ Streaming em tempo real

---

## 📊 API Endpoints

**Base URL**: `http://localhost:8002`

### Autenticação & Status
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/unity/status` | Status API e MongoDB |
| GET | `/unity/login/{unity_id}` | Login por Unity ID |
| GET | `/unity/ids` | Listar todos IDs |

### Dados de Solo
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/unity/soil/save/{unity_id}` | Salvar dados simulação |
| GET | `/unity/dashboard/{unity_id}` | Dashboard completo |
| GET | `/unity/monitoring/{unity_id}` | Monitoramento tempo real |

### Análise IA
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/unity/analise-ia/{unity_id}` | Análise IA (9 parâmetros) |
| POST | `/api/soil-tips/{unity_id}` | Dicas de melhoria (Ollama) |

### Chatbot
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/chat/{unity_id}` | Chat com streaming |
| POST | `/api/generate_title` | Gerar título conversa |

### Utilitários
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/unity/recreate-test-data` | Recriar dados teste |

---

## 🛠️ Stack Tecnológica

### Backend
- **Python 3.8+** - Linguagem principal
- **FastAPI** - Framework web moderno
- **MongoDB Atlas** - Banco NoSQL na nuvem
- **Ollama** - LLM local (Llama 3.2)
- **PyMongo** - Driver MongoDB
- **Requests** - HTTP client
- **Python-dotenv** - Variáveis ambiente

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Glassmorphism + Grid + Flexbox
- **JavaScript ES6+** - Vanilla modular
- **Chart.js** - Gráficos interativos
- **Marked.js** - Renderização markdown
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia

### IA & Dados
- **Llama 3.2** - Modelo de linguagem
- **RAG** - Base local conhecimento
- **DuckDuckGo** - Busca web
- **INMET API** - Dados climáticos
- **SQLite** - Memória persistente

---

## 🧠 Sistema IA

### Análise de Solo
**Status por parâmetro:**
- ✅ **Ideal** - Dentro da faixa ótima
- ✓ **Aceitável** - Próximo do ideal
- ⚠ **Atenção** - Requer monitoramento
- ❌ **Crítico** - Ação imediata necessária

**Informações fornecidas:**
- Valor atual vs faixa ideal
- Impacto no cultivo
- Recomendações práticas
- Alertas críticos
- Tendências temporais
- Nível de sustentabilidade

### Chatbot
**Contexto utilizado:**
1. **MongoDB** - Dados do usuário (perfil, solo, cultivo)
2. **RAG** - Base local (guias, técnicas agrícolas)
3. **Web** - Busca em tempo real (cotações, notícias)
4. **Clima** - INMET (previsões meteorológicas)
5. **Memória** - SQLite (preferências, histórico)

**Parâmetros Ollama:**
```python
{
    "model": "llama3.2",
    "num_predict": 500,      # Tokens por resposta
    "temperature": 0.7,      # Criatividade
    "top_p": 0.9,           # Consistência
    "stream": True          # Streaming
}
```

---

## 🗄️ MongoDB Atlas

### Collections

**1. Python_userData** (Perfis)
```json
{
  "_id": "unity_bf87c29494e0",
  "dados_pessoais": {
    "nome": "Thaiza Valentim",
    "email": "thaiza@example.com"
  },
  "propriedade": {
    "nome": "Fazenda Ekko",
    "area_hectares": 120.5,
    "cultivos_principais": ["Café", "Milho"]
  },
  "unity_stats": {
    "total_sessions": 15,
    "best_score": 850
  }
}
```

**2. Unity_soilData** (Dados de Solo)
```json
{
  "_id": "soil_unity_bf87c29494e0_1234567890",
  "unity_id": "unity_bf87c29494e0",
  "timestamp": "2025-01-15T10:30:00Z",
  "soil_parameters": {
    "ph": 6.5,
    "umidade": 55.0,
    "temperatura": 25.0
  },
  "nutrients": {
    "nitrogenio": 45.0,
    "fosforo": 30.0,
    "potassio": 180.0
  }
}
```

---

## 🎨 Interface Dashboard

### Seções

**1. 🏠 Início**
- Métricas em tempo real
- Informações do projeto
- Status desenvolvimento
- Dados do usuário

**2. 👤 Perfil**
- Dados pessoais
- Propriedade
- Experiência
- Estatísticas Unity

**3. 🧠 IA & Solo**
- Análise 9 parâmetros
- Status visual
- **Botão de dicas** (popup Ollama)
- Alertas críticos

**4. 💬 Chatbot**
- Llama 3.2 streaming
- Histórico conversas
- **Botão localização** (clima INMET)
- Sessões isoladas

**5. 📈 Estatísticas**
- Mapas de calor
- Gráficos temporais
- Filtros interativos

**6. 🎮 Unity**
- Histórico sessões
- Performance
- Conquistas

**7. 💻 Desenvolvimento**
- Stack tecnológico
- Arquitetura
- API endpoints

**8. 📡 Monitoramento**
- Tempo real
- Tendências
- Alertas

---

## ⚙️ Configuração

### 1. Backend (.env)
```env
UNITY_MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/
UNITY_MONGO_DB_NAME=EKKOnUnity
API_HOST=0.0.0.0
API_PORT=8002
API_DEBUG=False
```

### 2. Ollama
```bash
# Instalar Ollama
setup_llama.bat

# Ou manual
ollama pull llama3.2
```

### 3. Dados de Teste
```bash
cd Backend
python criar_dados_teste.py
```

---

## 🧪 Testes

### Unity ID de Teste
```
unity_bf87c29494e0  # Thaiza Valentim - Fazenda Ekko
```

### Verificar Dados
```bash
cd Backend
python verificar_dados.py
```

### Testar Llama
```bash
cd Backend
python test_llama.py
```

### Testar Chat
```bash
# Abrir Frontend/test_chat.html no navegador
```

---

## 🚀 Deploy

### Requisitos Mínimos
- Python 3.8+
- MongoDB Atlas (conta gratuita)
- Ollama instalado
- 4GB RAM
- Navegador moderno

### Produção
```bash
# Backend
API_DEBUG=False
API_HOST=0.0.0.0
API_PORT=8002

# Frontend
# Servir via HTTP server
```

---

## 📈 Métricas do Projeto

### Código
- **Linhas**: 4.5k+
- **Arquivos**: 25+
- **Endpoints**: 10
- **Parâmetros IA**: 9

### Desenvolvimento
- **Tempo**: 3 meses
- **Equipe**: 34DS08
- **Tecnologias**: 15+
- **Collections**: 2

---

## 🏆 Status do Projeto

- ✅ **Backend** - API + IA + Chatbot completos
- ✅ **Frontend** - Dashboard + Chat completos
- ✅ **Chatbot** - Llama 3.2 integrado
- ✅ **Análise IA** - 9 parâmetros funcionais
- 🔧 **Simulação Unity** - Em desenvolvimento
- 🏆 **45ª Projete ETE FMC** - Feira tecnológica

---

## 🎓 Equipe

**Projeto**: EKKO - Agricultura Gamificada  
**Equipe**: 34DS08  
**Curso**: Desenvolvimento de Sistemas  
**Instituição**: ETE FMC  
**Evento**: 45ª Projete  
**Tema**: Fraternidade e Ecologia Integral  
**Local**: Santa Rita do Sapucaí, MG

---

## 📞 Suporte & Links

**Dashboard**: http://localhost:8002  
**Documentação**: http://localhost:8002/docs  
**Status API**: http://localhost:8002/unity/status  
**GitHub**: ProjEkko

---

## 📝 Documentação Adicional

- **Backend Completo**: `Backend/BACKEND_COMPLETO.md`
- **Frontend Completo**: `Frontend/README.md`
- **Melhorias Chat**: `MELHORIAS_CHAT.md`

---

**EKKO** - Agricultura Gamificada 🌱🎮  
Sistema completo e otimizado! 🚀
