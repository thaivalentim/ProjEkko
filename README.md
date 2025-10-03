# 🌱 EKKO - Plataforma de Agricultura de Precisão

<div align="center">
  <img src="https://img.shields.io/badge/Python-3.8+-blue.svg" alt="Python">
  <img src="https://img.shields.io/badge/FastAPI-0.104+-green.svg" alt="FastAPI">
  <img src="https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg" alt="MongoDB">
  <img src="https://img.shields.io/badge/Unity-2022.3+-black.svg" alt="Unity">
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow.svg" alt="Status">
</div>

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
# 1. Clone o repositório
git clone https://github.com/seu-usuario/ProjEkko.git
cd ProjEkko

# 2. Configure o Backend
cd Backend
cp .env.example .env
# Edite o arquivo .env com suas credenciais do MongoDB
pip install -r requirements_unity.txt

# 3. Inicie o servidor
python main.py

# 4. Acesse o Frontend
cd ../Frontend
# Abra pages/index.html no seu navegador
```

### 🔗 Links de Acesso
- **API**: http://localhost:8002
- **Documentação**: http://localhost:8002/docs
- **Status da API**: http://localhost:8002/unity/status

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

## 🛠️ Stack Tecnológica

### Backend
- **Python 3.8+** - Linguagem principal
- **FastAPI** - Framework web moderno
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