# 🌱 EKKO - Plataforma de Agricultura de Precisão

<<<<<<< HEAD
Sistema integrado que combina **simulação 3D Unity**, **plataforma web** e **chatbot IA** para ensinar agricultura sustentável através de gamificação e análise inteligente de solo.

---
=======
<div align="center">
  <img src="https://img.shields.io/badge/Python-3.8+-blue.svg" alt="Python">
  <img src="https://img.shields.io/badge/FastAPI-0.104+-green.svg" alt="FastAPI">
  <img src="https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg" alt="MongoDB">
  <img src="https://img.shields.io/badge/Unity-2022.3+-black.svg" alt="Unity">
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow.svg" alt="Status">
</div>
>>>>>>> 2b4b3409ab6efa764a63de49b6c40acf26047e5c

## 📖 Sobre o Projeto

O Ekko é uma plataforma inovadora que integra agricultura de precisão, inteligência artificial e análise de dados, com o objetivo de promover sustentabilidade, otimização produtiva e democratização do conhecimento técnico agrícola. Por meio dela, o agricultor tem acesso a informações essenciais sobre o solo, como pH, umidade, temperatura e nutrientes, além de receber feedbacks detalhados, análises geradas por IA treinada com fontes de referência do setor agrícola brasileiro, suporte de chatbot especializado, estatísticas organizadas, gráficos interativos, mapas de calor e documentação técnica.

Para demonstrar o funcionamento completo do projeto, a equipe 34DS08, desenvolvedora do Ekko, criou uma simulação gamificada que ilustra na prática como o dispositivo inteligente móvel — que seria responsável pela coleta de dados por meio de sensores em um processo de mapeamento eficiente do solo — operaria em campo. A simulação foi projetada para aproximar o público da experiência real, avaliando o desempenho do usuário, atribuindo pontuações e feedbacks personalizados.

Assim, o sistema une uma simulação 3D desenvolvida na engine Unity a uma plataforma web moderna, oferecendo uma experiência imersiva, interativa e educativa sobre práticas agrícolas inteligentes.

### 🎯 Objetivos
- Democratizar o conhecimento sobre agricultura sustentável
- Capacitar produtores rurais através de tecnologia
- Promover práticas agrícolas responsáveis
- Facilitar a tomada de decisões baseada em dados

## ⚡ Início Rápido

### Pré-requisitos
- Python 3.8+
- MongoDB Atlas (conta gratuita)
- Navegador web moderno
- Unity 2022.3+ (para desenvolvimento da simulação)

### Instalação

```bash
<<<<<<< HEAD
# 1. Backend + Ollama
=======
# 1. Clone o repositório
git clone https://github.com/seu-usuario/ProjEkko.git
cd ProjEkko

# 2. Configure o Backend
>>>>>>> 2b4b3409ab6efa764a63de49b6c40acf26047e5c
cd Backend
cp .env.example .env
# Edite o arquivo .env com suas credenciais do MongoDB
pip install -r requirements_unity.txt
<<<<<<< HEAD
setup_llama.bat
=======

# 3. Inicie o servidor
>>>>>>> 2b4b3409ab6efa764a63de49b6c40acf26047e5c
python main.py

# 4. Acesse o Frontend
cd ../Frontend
# Abra pages/index.html no seu navegador
```

### 🔗 Links de Acesso
- **API**: http://localhost:8002
- **Documentação**: http://localhost:8002/docs
- **Status da API**: http://localhost:8002/unity/status

<<<<<<< HEAD
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
=======
## 🏗️ Arquitetura do Sistema

```
ProjEkko/
├── 🚀 Backend/                 # API e Inteligência Artificial
│   ├── main.py                 # Servidor FastAPI principal
│   ├── ai_analyzer.py          # Sistema de análise IA
│   ├── database.py             # Conexão MongoDB Atlas
│   ├── ai_connector.py         # Integração com modelos IA
│   ├── tool.py                 # Ferramentas auxiliares
│   ├── prompts.py              # Templates de prompts IA
│   ├── requirements_unity.txt  # Dependências Python
│   └── .env                    # Variáveis de ambiente
├── 🎨 Frontend/                # Interface Web
│   ├── pages/                  # Páginas HTML
│   │   ├── index.html          # Dashboard principal
│   │   └── login.html          # Página de login
│   ├── css/                    # Estilos e temas
│   │   ├── dashboard.css       # Estilos do dashboard
│   │   └── glassmorphism.css   # Tema moderno
│   └── js/                     # Scripts JavaScript
│       ├── dashboard.js        # Lógica do dashboard
│       └── charts.js           # Visualizações de dados
└── 📦 Obsoleto/                # Versões anteriores
```

## 🚀 Funcionalidades Principais

### 🔧 Backend (API + IA)
- **API RESTful** com FastAPI e documentação automática
- **Análise Inteligente** de 9 parâmetros críticos do solo
- **Sistema de Autenticação** integrado com Unity
- **Previsões Agronômicas** baseadas em machine learning
- **Recomendações Personalizadas** por cultura e região
- **Monitoramento em Tempo Real** de dados de solo
- **Integração com IA** (Ollama/LLaMA) para análises avançadas

### 🎨 Frontend (Dashboard Web)
- **Interface Moderna** com design glassmorphism
- **7 Seções Interativas**: Visão Geral, Monitoramento, Análise IA, Mapas, Histórico, Configurações, Ajuda
- **Visualizações Dinâmicas**: Gráficos, mapas de calor, indicadores
- **Design Responsivo** para desktop, tablet e mobile
- **UX Otimizada** com loading states e tratamento de erros

### 🧠 Sistema de IA - Análise de Solo
**9 Parâmetros Monitorados:**
- **pH** - Acidez/alcalinidade do solo
- **Umidade** - Teor de água disponível
- **Temperatura** - Condições térmicas
- **Salinidade** - Concentração de sais
- **Condutividade** - Capacidade elétrica
- **NPK** - Nitrogênio, Fósforo, Potássio
- **Matéria Orgânica** - Fertilidade natural
- **Densidade** - Compactação do solo
- **Performance** - Índice geral de qualidade

## 📊 API Endpoints

### Autenticação e Perfis
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/unity/status` | Status da API e conexão com banco |
| `POST` | `/unity/profile/create` | Criar novo perfil de usuário |
| `GET` | `/unity/login/{unity_id}` | Autenticação por Unity ID |
| `GET` | `/unity/ids` | Listar todos os Unity IDs |

### Dados e Análises
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/unity/dashboard/{unity_id}` | Dados completos do dashboard |
| `POST` | `/unity/soil/save/{unity_id}` | Salvar dados da simulação |
| `GET` | `/unity/monitoring/{unity_id}` | Monitoramento em tempo real |
| `GET` | `/unity/analise-ia/{unity_id}` | Análise completa com IA |

### Utilitários
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/unity/recreate-test-data` | Recriar dados de teste |
| `POST` | `/api/chat/{unity_id}` | Chat com assistente IA |
>>>>>>> 2b4b3409ab6efa764a63de49b6c40acf26047e5c

---

## 🛠️ Stack Tecnológica

### Backend
- **Python 3.8+** - Linguagem principal
- **FastAPI** - Framework web moderno
<<<<<<< HEAD
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
=======
- **MongoDB Atlas** - Banco de dados na nuvem
- **Pydantic** - Validação de dados
- **Uvicorn** - Servidor ASGI
- **Ollama/LLaMA** - Modelos de IA local

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos (Glassmorphism)
- **JavaScript ES6+** - Interatividade
- **Chart.js** - Visualizações de dados
- **Fetch API** - Comunicação com backend

### Ferramentas de Desenvolvimento
- **Git** - Controle de versão
- **VS Code** - Editor recomendado
- **Postman** - Testes de API
- **MongoDB Compass** - Interface do banco

## 🎮 Integração com a engine Unity

O sistema foi projetado para integração completa com uma simulação, encarregada de demonstrar na prática a aplicação do projeto no campo.

- **Comunicação HTTP** com a API
- **Sincronização de dados** em tempo real
- **Sistema de pontuação** gamificado
- **Métricas de gameplay** detalhadas
- **Salvamento automático** de progresso

## 📈 Status do Desenvolvimento

- ✅ **Backend API** - Completo e funcional
- ✅ **Sistema de IA** - Análise avançada implementada
- ✅ **Frontend Dashboard** - Interface moderna finalizada
- ✅ **Integração MongoDB** - Banco de dados configurado
- 🔧 **Simulação Unity** - Em desenvolvimento ativo
- 🔧 **Testes Automatizados** - Em implementação
- 📋 **Documentação** - Em expansão

## 🏆 Reconhecimentos

**45ª Projete ETE FMC** - Feira de Tecnologia  
Categoria: Fraternidade e Ecologia Integral

## 👥 Equipe de Desenvolvimento

**Equipe 34DS08**  
**ETE FMC** - Santa Rita do Sapucaí, MG

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Veja nosso [guia de contribuição](CONTRIBUTING.md) para começar.

---

<div align="center">
  <strong>EKKO - Transformando a agricultura através da tecnologia</strong> 🌱🎮<br>
  <em>Desenvolvido com ❤️ em Santa Rita do Sapucaí, MG</em>
</div>
>>>>>>> 2b4b3409ab6efa764a63de49b6c40acf26047e5c
