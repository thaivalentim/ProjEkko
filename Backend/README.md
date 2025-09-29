# 🌱 EKKO  - Backend

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)

---

O  backend é composto por três serviços principais: uma API de alta performance com **FastAPI** para análise de solo e integração com a **Unity** via **MongoDB Atlas**, a análise de IA do solo e atua como um intermediário para um serviço de chatbot utilizando a **API do Llama 3**, entregando uma solução completa e inteligente.

---

## ✨ Componentes Principais

| 🧩 Componente | 🔹 Descrição |
|------------------|-------------|
| 🌐 **API Principal (`main.py`)** | Serviço que gerencia usuários, dados do dashboard, e executa as análises de IA. |
| 🤖 **Serviço de Chatbot (`chat_bot.py`)**| Processo independente que gerencia a lógica de conversação com o modelo de linguagem (ex: Llama 3). |
| 🧠 **Analisador de IA (`ai_analyzer.py`)** | Módulo que executa modelos para analisar dados do solo e gerar insights. |
| 🗄️ **Banco de Dados Híbrido** | Utiliza **SQLite** (`ekko_memory.db`) para desenvolvimento/cache e possui integração com **MongoDB Atlas**. |
| 🌦️ **Dados Externos** | Integra informações de estações meteorológicas a partir do arquivo `estacoes_inmet.json`. |

---

## 🌈 Tecnologias Utilizadas

| 💻 Categoria | 🛠 Tecnologia | 🌟 Destaque |
|--------------|---------------|-------------|
| 🐍 Linguagem | Python 3.9+ | Versátil, robusta e com um ecossistema gigante para IA e web. |
| 🌐 Framework Web | Flask / FastAPI | Leve e flexível, ideal para a criação de APIs RESTful. |
| 🗄️ Banco de Dados| SQLite & MongoDB Atlas| Flexibilidade entre um banco local simples e uma solução na nuvem escalável. |
| 🧠 Análise de IA | Pandas, Scikit-learn | Bibliotecas padrão da indústria para manipulação de dados e machine learning. |

---

## 🚀 Como Executar

Para a plataforma funcionar completamente, os **dois serviços de backend** devem ser iniciados em terminais separados.

1.  **Configure o Ambiente**
    - Dentro da pasta `Backend`, copie o arquivo de exemplo `.env.example` para `.env`.
    - Preencha o `.env` com suas chaves (ex: `LLAMA_API_KEY`, `MONGO_URI`).
    ```bash
    cd Backend
    cp .env.example .env
    ```

2.  **Instale as Dependências**
    - No mesmo diretório `Backend`, crie e ative um ambiente virtual.
    - Instale as bibliotecas a partir de `requirements.txt`.
    ```bash
    # Ainda dentro de Backend/
    python -m venv env
    source env/bin/activate
    pip install -r requirements.txt
    ```

3.  **Inicie os Serviços (requer dois terminais)**

    - **Terminal 1: Iniciar API Principal**
        ```bash
        # Na pasta raiz do projeto, ative o ambiente virtual
        source Backend/env/bin/activate
        # Inicie a API principal
        python main.py
        ```
        *✅ API Principal rodando em uma porta (ex: `http://localhost:8002`)*

    - **Terminal 2: Iniciar API do Chatbot**
        ```bash
        # Na pasta raiz do projeto, ative o mesmo ambiente virtual
        source Backend/env/bin/activate
        # Inicie o serviço do chatbot
        python chat_bot.py
        ```
        *✅ API do Chatbot rodando em outra porta (ex: `http://localhost:8003`)*

---

## 🔗 Endpoints das APIs

### API Principal (Ex: `localhost:8002`)
| 🔹 Método | 🌐 Endpoint | 📋 Descrição |
|-----------|----------------------|-----------------------------------|
| GET | `/login/{user_id}` | Autentica o usuário. |
| GET | `/dashboard/{user_id}` | Retorna os dados para o dashboard. |
| GET | `/analise-ia/{user_id}` | Retorna a análise de IA do solo. |

### API do Chatbot (Ex: `localhost:8003`)
| 🔹 Método | 🌐 Endpoint | 📋 Descrição |
|-----------|----------------|-------------------------------------------|
| POST | `/chatbot/ask` | Envia pergunta e recebe resposta do chatbot. |

---

## 📂 Estrutura de Arquivos

```

├── Backend/
│ ├── env/                  # Ambiente virtual
│ ├── .env.example          # Exemplo de variáveis de ambiente
│ └── requirements.txt      # Dependências Python
│
├── tools/
│ ├── dados_plantacoes/     # Dados brutos das culturas
│ └── monitor_simple.py     # Script de monitoramento
│
├── ai_analyzer.py          # 🧠 Módulo de análise de IA
├── chat_bot.py             # 🤖 Serviço da API do Chatbot
├── main.py                 # 🚀 Serviço da API Principal
├── database.py             # 🗄️ Módulo de banco de dados
├── constants.py            # 📋 Constantes
├── prompts.py              # ✍️ Prompts para a IA
├── ekko_memory.db          # 💾 Banco de dados SQLite
└── estacoes_inmet.json     # 🌦️ Dados de estações meteorológicas

```

<p align="center">
 <strong>EKKO Backend</strong> — O cérebro inteligente que alimenta a simulação e transforma dados em conhecimento 🧠
</p>



