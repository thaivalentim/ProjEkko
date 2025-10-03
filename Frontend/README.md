# 🎨 EKKO - Frontend Completo

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
```

---

## 🚀 Como Usar

### 1. Iniciar Backend
```bash
cd Backend
python main.py
```

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
