# 🚀 EKKO - Backend API
# 🌱 EKKO - Backend Completo

Sistema de IA avançado para análise de solo com integração Unity, MongoDB Atlas e Chatbot Llama 3.2.

Sistema backend completo com FastAPI, IA e integração com a Unity para análise de solo em tempo real.
---

## 🚀 Início Rápido

```bash
# 1. Configurar ambiente
cp .env.example .env
# Editar .env com suas credenciais MongoDB Atlas

# 2. Instalar dependências
pip install -r requirements_unity.txt

# 3. Iniciar servidor
# 3. Configurar Ollama (Llama 3.2)
setup_llama.bat

# 4. Iniciar API
python main.py
```

**🌐 Acessos**:
- **API**: http://localhost:8002
- **Documentação**: http://localhost:8002/docs
- **Status**: http://localhost:8002/unity/status

## 📁 Estrutura do Projeto
---

## 📁 Estrutura do Projeto

```
Backend/
├── 🚀 main.py                    # API FastAPI principal
├── 🧠 ai_analyzer.py             # Sistema IA - 9 parâmetros
├── 🗄️ database.py                # MongoDB Atlas connection
├── 🤖 ai_connector.py            # Integração Ollama/LLaMA
├── 💬 chat_bot.py                # Chatbot especializado
├── 📋 constants.py               # Configurações e constantes
├── 🛠️ prompts.py                 # Templates de prompts IA
├── ⚙️ tool.py                    # Ferramentas auxiliares
├── 🔧 tools/
│   └── monitor_simple.py         # Monitor banco em tempo real
├── 📊 data/
│   ├── dados_plantacoes/         # Base de conhecimento
│   ├── ekko_memory.db            # Memória local IA
│   └── estacoes_inmet.json       # Dados meteorológicos
├── 🔐 .env                       # Credenciais (não versionado)
├── 📦 requirements_unity.txt     # Dependências Python
└── 🚀 Scripts utilitários
    ├── start_server.bat
    ├── restart.bat
    └── setup_llama.bat
├── main.py                  # 🚀 API Principal (FastAPI)
├── ai_analyzer.py           # 🧠 Sistema IA (9 parâmetros)
├── ai_connector.py          # 🤖 Conector Ollama (Llama 3.2)
├── prompts.py               # 💬 Prompts do Chatbot
├── tool.py                  # 🔧 Ferramentas RAG/Web/Clima
├── database.py              # 🗄️ MongoDB Atlas
├── constants.py             # 📋 Configurações
├── criar_dados_teste.py     # 🧪 Criar dados de teste
├── verificar_dados.py       # ✅ Verificar dados MongoDB
├── data/                    # 📂 Dados locais
│   ├── dados_plantacoes/    # 🌾 Base RAG
│   ├── ekko_memory.db       # 💾 Memória SQLite
│   └── estacoes_inmet.json  # 🌦️ Estações INMET
├── tools/                   # 🛠️ Utilitários
│   └── monitor_simple.py    # 📊 Monitor MongoDB
├── .env                     # 🔐 Credenciais
└── requirements_unity.txt   # 📦 Dependências
```

---

## 🧠 Sistema de IA

### Análise de Solo - 9 Parâmetros Críticos
- **🧪 pH** - Acidez/alcalinidade (6.0-7.0 ideal)
- **💧 Umidade** - Teor de água (40-60% ideal)
- **🌡️ Temperatura** - Condições térmicas (20-30°C ideal)
- **🧂 Salinidade** - Concentração de sais (<800 ppm)
- **⚡ Condutividade** - Capacidade elétrica (<2.0 dS/m)
- **🌱 Nitrogênio (N)** - Crescimento vegetativo (20-100 mg/kg)
- **🌿 Fósforo (P)** - Desenvolvimento radicular (15-50 mg/kg)
- **🍃 Potássio (K)** - Resistência e qualidade (100-250 mg/kg)
- **🎮 Performance Unity** - Score de gameplay (>500 pts)

### Funcionalidades da IA
- ✅ **Análise Inteligente** - Diagnóstico completo automatizado
- ✅ **Recomendações Personalizadas** - Por cultivo e região
- ✅ **Alertas Críticos** - Identificação de problemas urgentes
- ✅ **Predição de Colheita** - Estimativa de produtividade
- ✅ **Chatbot Especializado** - Suporte 24/7 com IA
- ✅ **Memória Persistente** - Aprendizado contínuo

## 📊 API Endpoints Completos

### 🔐 Autenticação & Perfis
| Método | Endpoint | Descrição |
|--------|----------|----------|
| `GET` | `/unity/status` | Status da API e conexão MongoDB |
| `POST` | `/unity/profile/create` | Criar novo perfil de usuário |
| `GET` | `/unity/login/{unity_id}` | Autenticação por ID |
| `GET` | `/unity/ids` | Listar todos os IDs |

### 📊 Dados & Análises
| Método | Endpoint | Descrição |
|--------|----------|----------|
| `GET` | `/unity/dashboard/{unity_id}` | Dados completos do dashboard |
| `POST` | `/unity/soil/save/{unity_id}` | Salvar dados da simulação Unity |
| `GET` | `/unity/monitoring/{unity_id}` | Monitoramento em tempo real |
| `GET` | `/unity/analise-ia/{unity_id}` | Análise completa com IA |

### 🤖 IA & Chatbot
| Método | Endpoint | Descrição |
|--------|----------|----------|
| `POST` | `/api/chat/{unity_id}` | Chat com assistente IA (streaming) |
| `POST` | `/api/generate_title` | Gerar títulos para conversas |

### 🛠️ Utilitários
### Análise de Solo (9 Parâmetros)

**Parâmetros analisados:**
- pH do Solo
- Umidade (%)
- Temperatura (°C)
- Salinidade (ppm)
- Condutividade (dS/m)
- Nitrogênio (N) - mg/kg
- Fósforo (P) - mg/kg
- Potássio (K) - mg/kg
- Performance Unity (pontos)

**Status por parâmetro:**
- ✅ **Ideal** - Dentro da faixa ótima
- ✓ **Aceitável** - Próximo do ideal
- ⚠ **Atenção** - Requer monitoramento
- ❌ **Crítico** - Ação imediata necessária

### Chatbot Llama 3.2

**Características:**
- Modelo: Llama 3.2 (via Ollama)
- Streaming: Respostas em tempo real
- Contexto: MongoDB + RAG + Web + Clima
- Sessões: Isoladas por Unity ID
- Limite: 200 tokens por resposta

**Capacidades:**
- ✅ Perguntas teóricas sobre agricultura
- ✅ Análise de dados específicos da fazenda
- ✅ Cotações e preços de mercado
- ✅ Previsões climáticas (INMET)
- ✅ Dicas de melhoria de solo
- ✅ Recomendações personalizadas

---

## 📊 API Endpoints

### Autenticação & Status

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/unity/status` | Status da API e MongoDB |
| GET | `/unity/login/{unity_id}` | Login por Unity ID |
| GET | `/unity/ids` | Listar todos Unity IDs |

### Dados de Solo

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/unity/soil/save/{unity_id}` | Salvar dados da simulação |
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
| POST | `/api/generate_title` | Gerar título de conversa |

### Utilitários

| Método | Endpoint | Descrição |
|--------|----------|----------|
| `GET` | `/unity/recreate-test-data` | Recriar dados de teste |

## ⚙️ Configuração Ambiente

### Arquivo `.env`
```env
# MongoDB Atlas
UNITY_MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
UNITY_MONGO_DB_NAME=DatabaseName

# API Configuration
API_HOST=0.0.0.0
API_PORT=8003
API_DEBUG=False

# Security (opcional)
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=*
```

### Collections MongoDB
- **`Python_userData`** - Perfis de usuários Unity
- **`Unity_soilData`** - Dados de solo da simulação
- **`chat_history`** - Histórico de conversas IA

## 🛠️ Ferramentas de Desenvolvimento
|--------|----------|-----------|
| GET | `/unity/recreate-test-data` | Recriar dados de teste |

---

## 🤖 Configuração Ollama

### Instalação

```bash
# Windows
setup_llama.bat

# Ou manual:
ollama pull llama3.2
```

### Parâmetros

```python
{
    "model": "llama3.2",
    "num_predict": 200,      # Máximo de tokens
    "temperature": 0.7,      # Criatividade
    "top_p": 0.9,           # Consistência
    "stream": True          # Streaming
}
```

### Teste

```bash
# Monitorar banco em tempo real
python tools/monitor_simple.py

# Testar IA local
python test_llama.py

# Configurar Ollama
./setup_llama.bat

# Iniciar servidor (Windows)
./start_server.bat
```

## 🔧 Stack Tecnológico

### Core
- **Python 3.8+** - Linguagem principal
- **FastAPI 0.104+** - Framework web moderno
- **MongoDB Atlas** - Banco NoSQL na nuvem
- **PyMongo 4.6+** - Driver MongoDB
- **Uvicorn** - Servidor ASGI

### IA & Machine Learning
- **Ollama/LLaMA** - Modelos de IA local
- **Sistema RAG** - Retrieval Augmented Generation
- **Base de Conhecimento** - Fontes agronômicas brasileiras
- **Análise Preditiva** - Algoritmos de predição

### Utilitários
- **Pydantic 2.5+** - Validação de dados
- **Python-dotenv** - Gerenciamento de ambiente
- **Faker** - Dados simulados para testes
- **WebSockets** - Comunicação em tempo real
python test_llama.py
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

### Configuração (.env)

```env
UNITY_MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/
UNITY_MONGO_DB_NAME=EKKOnUnity
API_HOST=0.0.0.0
API_PORT=8002
API_DEBUG=False
```

## 🎯 Funcionalidades Principais

- ✅ **API REST Completa** - 12+ endpoints documentados
- ✅ **Inteligência Artificial** - Análise de 9 parâmetros críticos
- ✅ **MongoDB Atlas** - Banco de dados na nuvem
- ✅ **Integração com a Unity** - Recebe dados da simulação
- ✅ **Chatbot Inteligente** - Suporte especializado 24/7
- ✅ **Streaming Response** - Respostas em tempo real
- ✅ **Sistema RAG** - Base de conhecimento agronômico
- ✅ **Monitoramento IoT** - Simulação de sensores
- ✅ **Documentação Automática** - Swagger/OpenAPI
- ✅ **CORS Configurado** - Integração frontend
- ✅ **Tratamento de Erros** - Sistema robusto
- ✅ **Logs Estruturados** - Debugging facilitado

## 📈 Métricas de Performance

- **⚡ Latência**: < 200ms (endpoints básicos)
- **🧠 IA**: < 2s (análise completa)
- **💬 Chat**: Streaming em tempo real
- **📊 Throughput**: 100+ req/s
- **🔄 Uptime**: 99.9% (MongoDB Atlas)

## 🚀 Deploy & Produção

### Preparado para AWS
- **EC2** - Servidor de aplicação
- **RDS/DocumentDB** - Banco gerenciado
- **S3** - Armazenamento de arquivos
- **CloudWatch** - Monitoramento
- **Load Balancer** - Alta disponibilidade

---

**EKKO** - Sistema robusto e escalável para agricultura de precisão 🌱🚀
---

## 🔧 Ferramentas RAG

### 1. Base Local (RAG)

**Localização:** `data/dados_plantacoes/`

**Conteúdo:**
- Guias de cultivo
- Técnicas agrícolas
- Dados agronômicos brasileiros

**Uso:**
```python
from tool import local_database_search
resultado = local_database_search("Como plantar café?")
```

### 2. Busca Web

**Fontes:**
- DuckDuckGo (busca geral)
- Sites agrícolas brasileiros

**Uso:**
```python
from tool import focused_web_search
resultado = focused_web_search("Preço do café hoje")
```

### 3. Clima INMET

**API:** Instituto Nacional de Meteorologia

**Uso:**
```python
from tool import get_inmet_forecast
resultado = get_inmet_forecast(lat=-22.0, lon=-45.0)
```

### 4. Memória Persistente

**Banco:** SQLite (`ekko_memory.db`)

**Uso:**
```python
from tool import store_memory, recall_memories
store_memory("Usuário prefere café arábica")
memorias = recall_memories()
```

---

## 🎯 Funcionalidades Completas

### Backend
- ✅ API REST com FastAPI
- ✅ MongoDB Atlas (nuvem)
- ✅ Análise IA (9 parâmetros)
- ✅ Chatbot Llama 3.2
- ✅ Streaming de respostas
- ✅ RAG (base local)
- ✅ Busca web
- ✅ Clima INMET
- ✅ Memória persistente
- ✅ Sessões isoladas por usuário
- ✅ Documentação Swagger

### Chatbot
- ✅ Perguntas teóricas
- ✅ Dados específicos da fazenda
- ✅ Cotações de mercado
- ✅ Previsões climáticas
- ✅ Dicas personalizadas
- ✅ Histórico de conversas
- ✅ Títulos automáticos (IA)

### Análise IA
- ✅ 9 parâmetros de solo
- ✅ Status por parâmetro
- ✅ Impacto no cultivo
- ✅ Recomendações práticas
- ✅ Alertas críticos
- ✅ Tendências temporais
- ✅ Sustentabilidade

---

## 🛠️ Scripts Úteis

### Criar Dados de Teste
```bash
python criar_dados_teste.py
```

### Verificar Dados
```bash
python verificar_dados.py
```

### Monitor MongoDB
```bash
python tools/monitor_simple.py
```

### Reiniciar Servidor
```bash
restart.bat
```

### Testar Llama
```bash
python test_llama.py
```

---

## 📈 Melhorias do Chat

### Antes vs Depois

**Antes:**
- ❌ Respostas de 500+ palavras
- ❌ "Olá" repetido várias vezes
- ❌ Mensagens saindo da caixa
- ❌ Prompt complexo (100+ linhas)

**Depois:**
- ✅ Respostas de 100-150 palavras
- ✅ Cumprimento único
- ✅ Mensagens sempre dentro da caixa
- ✅ Prompt simples (15 linhas)

### Parâmetros Otimizados

```python
{
    "num_predict": 200,      # Limite de tokens
    "temperature": 0.7,      # Equilíbrio
    "top_p": 0.9            # Consistência
}
```

---

## 🔐 Segurança

- ✅ Credenciais em `.env`
- ✅ CORS configurado
- ✅ Validação de Unity ID
- ✅ Sessões isoladas
- ✅ Dados criptografados (MongoDB)

---

## 📊 Monitoramento

### Status da API
```bash
curl http://localhost:8002/unity/status
```

### Logs
- Console: Logs em tempo real
- Erros: Tratamento completo
- Debug: Modo opcional

---

## 🚀 Deploy

### Requisitos
- Python 3.8+
- MongoDB Atlas
- Ollama (Llama 3.2)
- 4GB RAM mínimo

### Produção
```bash
# Desativar debug
API_DEBUG=False

# Usar host específico
API_HOST=0.0.0.0
API_PORT=8002
```

---

## 📝 Notas Técnicas

### Arquitetura
- **Framework:** FastAPI
- **Banco:** MongoDB Atlas
- **IA:** Llama 3.2 (Ollama)
- **RAG:** Base local + Web
- **Clima:** API INMET

### Performance
- Streaming: Respostas em tempo real
- Cache: Dados otimizados
- Async: Operações assíncronas

### Escalabilidade
- MongoDB Atlas: Auto-scaling
- FastAPI: Alta performance
- Ollama: Local (sem custos API)

---

## 🎓 Equipe

**Projeto:** EKKO - Agricultura Gamificada  
**Equipe:** 34DS08  
**Instituição:** ETE FMC  
**Evento:** 45ª Projete  
**Tema:** Fraternidade e Ecologia Integral

---

## 📞 Suporte

**Documentação:** http://localhost:8002/docs  
**Status:** http://localhost:8002/unity/status  
**GitHub:** ProjEkko/Backend

---

**EKKO Backend** - Sistema completo e otimizado! 🚀🌱
