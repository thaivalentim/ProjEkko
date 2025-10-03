# 🎨 EKKO - Frontend Completo

<<<<<<< HEAD
Interface web moderna com dashboard interativo, chatbot IA e visualizações avançadas.

---

## 📁 Estrutura

```
Frontend/
├── pages/
│   ├── index.html           # Homepage
│   ├── login.html           # Login Unity ID
│   └── dashboard.html       # Dashboard principal
├── css/
│   ├── index.css            # Estilos homepage
│   ├── login.css            # Estilos login
│   ├── dashboard.css        # Estilos dashboard
│   ├── chat_bot.css         # Estilos chatbot
│   ├── monitoring.css       # Estilos monitoramento
│   ├── correlations.css     # Estilos correlações
│   └── modal.css            # Estilos modais
├── js/
│   ├── index.js             # Lógica homepage
│   ├── unity-dashboard.js   # Dashboard principal
│   ├── chat_bot.js          # Chatbot Llama 3.2
│   ├── monitoring.js        # Monitoramento tempo real
│   └── correlation-engine.js # Engine correlações
└── assets/
    └── images/
        ├── inicio.jpg       # Imagem início
        └── Fundo_menu.png   # Background
=======
Interface web moderna e responsiva para visualização completa de dados com análise de IA em tempo real.

## 📁 Estrutura Completa do Projeto

```
Frontend/
├── 📄 pages/                   # Páginas HTML
│   ├── index.html              # Homepage institucional
│   ├── login.html              # Autenticação Unity ID
│   └── dashboard.html          # Dashboard principal (7 seções)
├── 🎨 css/                     # Estilos & Temas
│   ├── index.css               # Homepage + animações
│   ├── login.css               # Tela de login
│   ├── dashboard.css           # Dashboard principal
│   ├── chat_bot.css            # Chatbot IA
│   ├── monitoring.css          # Monitoramento IoT
│   ├── correlations.css        # Correlações de dados
│   └── modal.css               # Modais e pop-ups
├── ⚙️ js/                      # Scripts JavaScript
│   ├── index.js                # Lógica homepage
│   ├── unity-dashboard.js      # Dashboard principal (4.5k+ linhas)
│   ├── chat_bot.js             # Chatbot especializado
│   ├── monitoring.js           # Monitoramento tempo real
│   └── correlation-engine.js   # Engine de correlações
├── 🖼️ assets/
│   └── images/                 # Imagens e recursos
│       ├── Fundo_menu.png
│       └── inicio.jpg
└── 🧪 test_chat.html          # Teste do chatbot
>>>>>>> 2b4b3409ab6efa764a63de49b6c40acf26047e5c
```

---

## 🚀 Como Usar

### 1. Pré-requisitos
```bash
<<<<<<< HEAD
cd Backend
=======
# Certifique-se que o backend está rodando
cd ../Backend
>>>>>>> 2b4b3409ab6efa764a63de49b6c40acf26047e5c
python main.py
# API disponível em: http://localhost:8002
```

<<<<<<< HEAD
### 2. Configurar Ollama (Chatbot)
```bash
cd Backend
setup_llama.bat
```

### 3. Abrir Frontend
Abrir `pages/index.html` no navegador

### 4. Fluxo
1. **Homepage** → Apresentação do projeto
2. **Login** → Digite Unity ID (ex: unity_bf87c29494e0)
3. **Dashboard** → Acesso completo

---

## 📊 Seções Dashboard

### 1. 🏠 Início
- Métricas em tempo real (pH, umidade, temperatura)
- Informações do projeto
- Status do desenvolvimento
- Dados do usuário atual

### 2. 👤 Perfil
- Dados pessoais completos
- Informações da propriedade
- Experiência agrícola
- Estatísticas Unity
- Conquistas e auditoria

### 3. 🧠 IA & Solo
- Análise de 9 parâmetros
- Status por parâmetro (Ideal/Atenção/Crítico)
- Impacto no cultivo
- **Botão de dicas** - Abre popup com recomendações da Ollama
- Alertas críticos
- Nível de sustentabilidade

### 4. 💬 Chatbot
- **Llama 3.2** via Ollama
- Streaming de respostas
- Histórico de conversas
- Sessões isoladas por usuário
- **Botão de localização** - Ativa previsão clima INMET
- Perguntas teóricas e específicas
- Cotações e mercado

### 5. 📈 Estatísticas
- Mapas de calor interativos
- Gráficos de evolução temporal
- Filtros por parâmetro e período
- Visualizações Chart.js

### 6. 🎮 Unity
- Histórico de sessões
- Estatísticas de jogo
- Performance e conquistas
- Tempo total jogado

### 7. 💻 Desenvolvimento
- Stack tecnológico
- Arquitetura do sistema
- API endpoints
- Métricas de desenvolvimento
- Serviços AWS

### 8. 📡 Monitoramento
- Dados em tempo real
- Gráficos de tendência
- Alertas automáticos
- Filtros por período

---

## 🤖 Chatbot Llama 3.2

### Características
- **Modelo**: Llama 3.2 (via Ollama)
- **Streaming**: Respostas em tempo real
- **Contexto**: MongoDB + RAG + Web + Clima
- **Sessões**: Isoladas por Unity ID
- **Tokens**: Até 500 por resposta

### Capacidades
- ✅ Perguntas teóricas sobre agricultura
- ✅ Análise de dados da fazenda
- ✅ Cotações e preços de mercado
- ✅ Previsões climáticas (INMET)
- ✅ Dicas de melhoria de solo
- ✅ Recomendações personalizadas

### Funcionalidades
- **Histórico**: Sidebar com conversas anteriores
- **Títulos automáticos**: Gerados por IA
- **Sessões**: Nova conversa a qualquer momento
- **Localização**: Botão para ativar clima
- **Delete**: Confirmação antes de apagar

---

## 🎯 Funcionalidades Completas

### Interface
- ✅ Login por Unity ID
- ✅ Dashboard com 8 seções
- ✅ Design responsivo (desktop/tablet/mobile)
- ✅ Glassmorphism moderno
- ✅ Navegação fluida
- ✅ Loading states
- ✅ Error handling
- ✅ Mensagens de feedback

### Chatbot
- ✅ Streaming de respostas
- ✅ Histórico persistente
- ✅ Sessões isoladas
- ✅ Títulos automáticos
- ✅ Botão de localização
- ✅ Modal de confirmação
- ✅ Sidebar retrátil

### Análise IA
- ✅ 9 parâmetros de solo
- ✅ Status visual por parâmetro
- ✅ Popup com dicas (Ollama)
- ✅ Impacto detalhado
- ✅ Recomendações práticas
- ✅ Alertas críticos

### Visualizações
- ✅ Mapas de calor
- ✅ Gráficos temporais
- ✅ Métricas em cards
- ✅ Filtros interativos
- ✅ Chart.js integrado

---

## 🔧 Tecnologias

### Core
- **HTML5** - Estrutura semântica
- **CSS3** - Glassmorphism + Grid + Flexbox
- **JavaScript** - Vanilla ES6+ modular

### Bibliotecas
- **Chart.js** - Gráficos interativos
- **Marked.js** - Renderização markdown
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia (Inter, Poppins, JetBrains Mono)

### APIs
- **FastAPI Backend** - http://127.0.0.1:8002
- **Ollama** - http://localhost:11434
- **MongoDB Atlas** - Dados na nuvem

---

## 🌐 Integração API

### Base URL
```
http://127.0.0.1:8002
```

### Endpoints Principais

**Autenticação**
- `GET /unity/login/{unity_id}` - Login
- `GET /unity/status` - Status API

**Dados**
- `GET /unity/dashboard/{unity_id}` - Dashboard completo
- `GET /unity/analise-ia/{unity_id}` - Análise IA
- `GET /unity/monitoring/{unity_id}` - Monitoramento

**Chatbot**
- `POST /api/chat/{unity_id}` - Chat streaming
- `POST /api/generate_title` - Gerar título
- `POST /api/soil-tips/{unity_id}` - Dicas de solo

---

## 🎨 Design System

### Cores
```css
--primary-green: #22C55E
--secondary-green: #10B981
--tech-blue: #3B82F6
--purple: #8B5CF6
--orange: #F97316
--amber: #F59E0B
--red: #EF4444
--gray-50 to gray-900
```

### Tipografia
- **Títulos**: Playfair Display
- **Corpo**: Inter
- **Código**: JetBrains Mono
- **UI**: Poppins

### Componentes
- Cards com glassmorphism
- Botões com hover effects
- Modais com backdrop
- Sidebar retrátil
- Loading spinners
- Toast messages

---

## 📱 Responsividade

### Breakpoints
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

### Adaptações
- Grid responsivo
- Sidebar colapsável
- Cards empilháveis
- Fontes escaláveis

---

## 🔐 Segurança

- ✅ Unity ID validado
- ✅ Sessões isoladas (localStorage)
- ✅ CORS configurado
- ✅ Error handling completo
- ✅ Sanitização de inputs

---

## 🚀 Performance

### Otimizações
- Lazy loading de seções
- Cache de dados
- Debounce em inputs
- Async/await
- Streaming de respostas

### Métricas
- Carregamento inicial: < 2s
- Troca de seções: < 100ms
- Resposta chatbot: Streaming em tempo real

---

## 🧪 Testes

### Unity IDs de Teste
```
unity_bf87c29494e0  # Thaiza Valentim - Fazenda Ekko
```

### Criar Dados de Teste
```bash
cd Backend
python criar_dados_teste.py
```

### Verificar Dados
```bash
cd Backend
python verificar_dados.py
```

---

## 📝 Estrutura de Dados

### localStorage
```javascript
{
  "unityId": "unity_bf87c29494e0",
  "ekkoChatSessions_unity_bf87c29494e0": {...},
  "ekkoActiveSessionId_unity_bf87c29494e0": "session_123",
  "ekkoSidebarCollapsed_unity_bf87c29494e0": "false"
}
```

### Session Storage
```javascript
{
  "unity_id": "unity_bf87c29494e0"
}
```

---

## 🎓 Equipe

**Projeto**: EKKO - Agricultura Gamificada  
**Equipe**: 34DS08  
**Instituição**: ETE FMC  
**Evento**: 45ª Projete  
**Tema**: Fraternidade e Ecologia Integral

---

## 📞 Suporte

**Dashboard**: http://localhost:8002  
**Documentação**: http://localhost:8002/docs  
**Status**: http://localhost:8002/unity/status

---

**EKKO Frontend** - Interface completa e moderna! 🚀🎨
=======
### 2. Abrir Frontend
```bash
# Abrir no navegador
open pages/index.html
# ou
start pages/index.html  # Windows
```

### 3. Fluxo de Navegação
1. **🏠 Homepage** → Apresentação do projeto e estatísticas
2. **🔐 Login** → Autenticação com Unity ID
3. **📋 Dashboard** → 7 seções interativas completas
4. **🤖 Chatbot** → Assistente IA especializado

## 📋 Dashboard - 7 Seções Principais

### 🏠 1. Início (Dashboard)
- **Visão Geral** - Métricas em tempo real
- **Status do Projeto** - Progresso desenvolvimento
- **Sobre o Ekko** - Informações do sistema
- **Performance** - Dados da simulação

### 👤 2. Minha Conta (Perfil)
- **Dados Pessoais** - Informações completas
- **Propriedade Rural** - Detalhes da fazenda
- **Experiência Agrícola** - Histórico profissional
- **Achievements Unity** - Conquistas do jogo

### 🧠 3. Análise Inteligente (IA)
- **Diagnóstico IA** - Análise de 9 parâmetros
- **Saúde do Solo** - Indicadores críticos
- **Recomendações** - Sugestões personalizadas
- **Alertas Críticos** - Problemas urgentes

### 📈 4. Relatórios (Estatísticas)
- **Mapas de Calor** - Visualizações avançadas
- **Gráficos Temporais** - Evolução dos parâmetros
- **Correlações** - Relações entre variáveis
- **Exportação** - Relatórios em PDF/Excel

### 🎮 5. Simulação (Unity)
- **Histórico de Sessões** - Performance completa
- **Estatísticas de Jogo** - Métricas detalhadas
- **Achievements** - Conquistas desbloqueadas
- **Progresso** - Evolução do jogador

### 💻 6. Sobre o Sistema (Desenvolvimento)
- **Stack Tecnológico** - Tecnologias utilizadas
- **Arquitetura** - Estrutura do sistema
- **API Endpoints** - Documentação técnica
- **Métricas** - Performance e estatísticas

### 📡 7. Monitoramento
- **IoT Simulado** - Sensores em tempo real
- **Alertas Automáticos** - Notificações inteligentes
- **Histórico 24h** - Dados contínuos
- **Filtros Avançados** - Personalização de visualização

## 🔧 Stack Tecnológico

### Frontend Core
- **HTML5** - Estrutura semântica moderna
- **CSS3** - Design glassmorphism + responsivo
- **JavaScript ES6+** - Vanilla modular (4.5k+ linhas)
- **Chart.js 4.0+** - Visualizações interativas
- **Canvas API** - Mapas de calor customizados

### Design & UX
- **Glassmorphism** - Tendência visual moderna
- **Design System** - Cores e tipografia consistentes
- **Responsive Design** - Mobile-first approach
- **Font Awesome 6.0** - Biblioteca de ícones
- **Google Fonts** - Tipografia (Inter + Poppins)

### Integrações
- **Fetch API** - Comunicação assíncrona
- **WebSocket** - Tempo real (futuro)
- **LocalStorage** - Persistência local
- **Session Management** - Gerenciamento de sessão

## 🎯 Funcionalidades Avançadas

### ✅ Autenticação & Segurança
- **Login via ID único** - Autenticação integrada
- **Session Persistence** - Manter login
- **Auto-logout** - Segurança automática
- **Error Handling** - Tratamento robusto

### ✅ Interface & Experiência
- **7 Seções Completas** - Dashboard abrangente
- **Navegação Fluida** - Transições suaves
- **Loading States** - Feedback visual
- **Responsive Design** - Todos os dispositivos
- **Dark/Light Mode** - Temas adaptativos

### ✅ Visualização de Dados
- **Gráficos Interativos** - Chart.js avançado
- **Mapas de Calor** - Canvas customizado
- **Dashboards Dinâmicos** - Atualização em tempo real
- **Filtros Avançados** - Personalização completa
- **Exportação** - PDF, Excel, PNG

### ✅ IA & Chatbot
- **Chatbot Especializado** - IA agronômica
- **Streaming Response** - Respostas em tempo real
- **Histórico de Conversas** - Persistência
- **Sugestões Inteligentes** - Recomendações da IA

### ✅ Monitoramento IoT
- **Sensores Simulados** - 9 parâmetros
- **Alertas Automáticos** - Notificações push
- **Histórico 24/7** - Dados contínuos
- **Correlações** - Análise de padrões

## 🌐 Integração com API

### Base URL
```javascript
const API_BASE = "http://127.0.0.1:8002";
```

### Endpoints Principais
```javascript
// Autenticação
GET  /unity/login/{unity_id}           // Login
GET  /unity/status                     // Status API

// Dashboard
GET  /unity/dashboard/{unity_id}       // Dados completos
GET  /unity/analise-ia/{unity_id}      // Análise IA
GET  /unity/monitoring/{unity_id}      // Monitoramento

// Chatbot
POST /api/chat/{unity_id}             // Chat streaming
POST /api/generate_title               // Títulos IA
```

### Tratamento de Erros
```javascript
// Error handling robusto
try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
} catch (error) {
    console.error('API Error:', error);
    showErrorMessage(error.message);
}
```

## 📈 Performance & Otimização

### Métricas
- **⚡ Load Time**: < 2s (primeira carga)
- **🔄 Responsividade**: < 100ms (interações)
- **📋 Bundle Size**: ~150KB (minificado)
- **📱 Mobile Score**: 95+ (Lighthouse)

### Otimizações
- **Lazy Loading** - Carregamento sob demanda
- **Code Splitting** - Módulos separados
- **Image Optimization** - Compressão automática
- **Caching Strategy** - Cache inteligente
- **Minification** - Código otimizado

## 🚀 Deploy & Hospedagem

### Preparado para Produção
- **Static Hosting** - Netlify, Vercel, S3
- **CDN Ready** - CloudFront, CloudFlare
- **PWA Support** - Progressive Web App
- **SEO Optimized** - Meta tags completas

### Configuração de Deploy
```bash
# Build para produção
npm run build

# Deploy automático
npm run deploy
```

## 🔍 Debug & Desenvolvimento

### Console Logs
```javascript
// Logs estruturados para debug
console.log('UnityDashboard: Carregando perfil...', unityId);
console.error('API Error:', error);
console.info('Performance:', metrics);
```

### Ferramentas
- **Browser DevTools** - Debug nativo
- **Network Monitor** - Análise de requests
- **Performance Profiler** - Otimização
- **Lighthouse** - Auditoria completa

---

**EKKO** - Interface moderna, responsiva e otimizada para agricultura de precisão 🌱💻
>>>>>>> 2b4b3409ab6efa764a63de49b6c40acf26047e5c
