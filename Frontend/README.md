# 🌿 EKKO - Frontend 🌿

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

---

## 🌟 EKKO Frontend

uma interface web moderna, responsiva e **projetada para uma experiência de usuário impecável**. Através dela, a plataforma oferece um **chatbot especialista que responde dúvidas e interpreta dados**, ao mesmo tempo que transforma complexas análises de IA em **visualizações intuitivas**, garantindo uma gestão de dados totalmente fluida e eficiente. 

---

## ✨ Funcionalidades Principais

| 🌈 Funcionalidade | 🔹 Descrição |
|------------------|-------------|
| 🤖 **Chatbot Agrônomo** | Assistente virtual inteligente que responde dúvidas, interpreta métricas e sugere decisões. |
| 📊 **Dashboard 360º** | Painel completo dividido em 7 seções estratégicas, cada uma com gráficos e mapas interativos. |
| 🧠 **Análise de IA** | 9 parâmetros do solo traduzidos em gráficos e indicadores visuais fáceis de entender. |
| 🗺️ **Mapas de Calor Interativos** | Identifique áreas críticas da fazenda com cores e destaques claros. |
| 🎨 **Design Moderno** | Glassmorphism, cores suaves e layout responsivo para qualquer dispositivo. |
| ⚡ **Experiência Fluida** | Navegação rápida, feedback visual, loading states e tratamento de erros em tempo real. |
| 🔑 **Autenticação Segura** | Login com **Unity ID** para personalização e proteção dos dados. |

---

## 🌈 Tecnologias Utilizadas

| 💻 Categoria | 🛠 Tecnologia | 🌟 Destaque |
|--------------|---------------|-------------|
| 🏗️ Estrutura | HTML5 | Código semântico, organizado e acessível |
| 🎨 Estilo | CSS3 | Layout moderno, Glassmorphism, Flexbox e Grid |
| ⚡ Lógica | JavaScript (ES6+) | Interatividade e manipulação do DOM sem frameworks |
| 📈 Gráficos | [Chart.js](https://www.chartjs.org/) | Gráficos dinâmicos e interativos |
| 🖼️ Ícones | [Font Awesome](https://fontawesome.com/) | Ícones claros, intuitivos e escaláveis |
| ✍️ Tipografia | [Google Fonts](https://fonts.google.com/) | Letras elegantes, legíveis e harmônicas |

---

## 🚀 Como Executar

### Pré-requisitos
- Backend do Ekko ativo ([instruções](../Backend/README.md))  
- Navegador moderno (Chrome, Firefox, Edge)  
- VS Code + **Live Server** (recomendado)  

### Passos
1. Terminal 1: Iniciar API Principal 
```bash
# Navegue até a pasta do backend

cd ../Backend

# Ative o ambiente virtual e inicie a API

source env/bin/activate

python main.py

#se seu computador não reconhecer o comando 'python' use o abaixo 

py main.py

```
- ✅ API Principal rodando em `http://127.0.0.1:8002`

2. Terminal 2: Iniciar API do Chatbot:
```bash
# Navegue até a pasta do backend
cd ../Backend

# Ative o ambiente virtual e inicie a API

source env/bin/activate

python chat_bot.py

#se seu computador não reconhecer o comando 'python' use o abaixo 

py chat_bot.py

```
-✅ API do Chatbot rodando em `http://127.0.0.1:8003`

3. Iniciar Frontend:  
  - Abra a pasta `Frontend` no VS Code. 
  - Clique em `pages/index.html` → **Open with Live Server**
  - Explore a aplicação!

> ⚠️ Abrir diretamente o HTML no navegador pode gerar erros de **CORS**.

---

## 🔗 Integração com API

**Base URL:** `http://127.0.0.1:8002`  

| 🔹 Método | 🌐 Endpoint | 📋 Descrição |
|-----------|------------|--------------|
| GET | `/unity/login/{user_id}` | Login e obtenção de token |
| GET | `/unity/dashboard/{user_id}` | Dados completos do dashboard |
| GET | `/unity/analise-ia/{user_id}` | Resultados da análise de IA |
| POST | `/chatbot/ask` | Envia pergunta ao chatbot |

---

## 📊 Seções do Dashboard

| 🌟 Seção | 🔹 Descrição |
|----------|-------------|
| 🏠 **Início** | Visão geral e métricas em tempo real |
| 👤 **Perfil** | Dados completos do usuário |
| 🧠 **IA & Solo** | Análise detalhada de 9 parâmetros do solo |
| 🤖 **Chatbot EKKO** | Conversa, dicas e insights personalizados |
| 📈 **Estatísticas** | Mapas de calor, gráficos e relatórios visuais |
| 🎮 **Unity** | Histórico completo das sessões da simulação |
| 💻 **Desenvolvimento** | Documentação, recursos e tutoriais |
| 📡 **Monitoramento** | Funcionalidades futuras planejadas |

---

## 📂 Estrutura de Arquivos

```
Frontend/
├── pages/
│ ├── index.html                # Homepage
│ ├── login.html                # Tela de login
│ ├── dashboard.html            # Dashboard principal
│ └── chat_bot.html             # Chatbot integrado
│
├── css/
│ ├── index.css
│ ├── login.css
│ └── dashboard.css
│
├── js/
│ ├── index.js
│ ├── chat_bot.js               # Lógica do chatbot + API
│ └── unity-dashboard.js        # Dashboard e gráficos
│
└── assets/
└── images/
└── Fundo_menu.png              # Imagem de fundo do menu principal

```


---

<p align="center">
 <strong>EKKO Frontend</strong> — Uma interface viva, colorida e interativa, transformando dados agrícolas em decisões visuais e estratégicas 
</p>
