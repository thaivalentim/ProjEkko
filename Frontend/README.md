# 🎨 EKKO Unity - Frontend Dashboard

Interface web moderna para visualização dos dados da simulação Unity.

## 📁 Estrutura Essencial

```
FrontendUnity/
├── pages/
│   ├── index.html         # Página inicial
│   ├── login.html         # Login por Unity ID
│   └── dashboard.html     # Dashboard principal
├── css/
│   └── dashboard.css      # Estilos completos
├── js/
│   └── unity-dashboard.js # JavaScript modular
├── assets/
│   └── images/
│       └── Fundo_menu.png # Background
├── README.md              # Esta documentação
└── PROGRESSO.md           # Status do desenvolvimento
```

## 🚀 Como Usar

### 1. Iniciar Backend
```bash
cd ../EkkoUnity
python start_atlas_api.py
```

### 2. Abrir Frontend
Abrir `pages/index.html` no navegador ou usar servidor local:
```bash
# Python
python -m http.server 3000

# Node.js
npx serve .
```

### 3. Acessar
- **Home**: http://localhost:3000/pages/index.html
- **Login**: http://localhost:3000/pages/login.html
- **Dashboard**: http://localhost:3000/pages/dashboard.html

## 🎮 Fluxo de Uso

1. **Página Inicial** → Apresentação do sistema
2. **Login** → Digite Unity ID (ex: `unity_test123`)
3. **Dashboard** → Visualização completa dos dados

## 📊 Seções do Dashboard

### 🏠 **Início**
- Métricas Unity em tempo real
- Cards com dados do jogador
- Status de saúde do solo
- Ações do jogador

### 👤 **Perfil**
- Dados pessoais completos
- Informações da propriedade
- Experiência e Unity stats
- Achievements e auditoria

### 🧠 **IA & Solo**
- Análise avançada de 9 parâmetros
- Previsão de colheita
- Análise econômica
- Recomendações personalizadas
- Ações prioritárias

### 📈 **Estatísticas**
- Mapas de calor interativos
- Timeline de parâmetros
- Controles de visualização
- Análise temporal

### 🎮 **Unity**
- Histórico de sessões
- Performance de jogo
- Estatísticas detalhadas
- Informações da conta

### 💻 **Desenvolvimento**
- Stack tecnológico completo
- Documentação da arquitetura
- API endpoints detalhados
- Métricas de desenvolvimento
- Backend e Frontend specs

### 📡 **Monitoramento**
- Sistema em desenvolvimento
- Sensores IoT futuros

## 🎨 Design

- **Tema**: Gaming Unity com glassmorphism
- **Cores**: Verde EKKO + azul tech + roxo Unity
- **Layout**: Responsivo e modular
- **Animações**: Transições suaves + hover effects
- **Ícones**: Font Awesome 6
- **Hero Section**: Gradientes modernos
- **Cards**: Elevação e sombras

## 🔧 Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos + glassmorphism
- **JavaScript** - Vanilla JS modular (ES6+)
- **Chart.js** - Gráficos interativos
- **Font Awesome** - Biblioteca de ícones
- **Google Fonts** - Tipografia Poppins + Inter
- **JetBrains Mono** - Fonte para código

## 🌐 API Integration

**Base URL**: `http://127.0.0.1:8002`

**Endpoints usados**:
- `/unity/login/{unity_id}` - Login
- `/unity/dashboard/{unity_id}` - Dados completos
- `/unity/analise-ia/{unity_id}` - Análise IA

## 📱 Responsividade

- **Desktop**: Layout completo
- **Tablet**: Adaptado
- **Mobile**: Otimizado

## 🔍 Funcionalidades

- ✅ Login por Unity ID
- ✅ Dashboard completo
- ✅ Análise IA avançada
- ✅ Visualizações interativas
- ✅ Mapas de calor
- ✅ Timeline de dados
- ✅ Navegação fluida
- ✅ Mensagens de status
- ✅ Loading states
- ✅ Error handling
- ✅ Seção Desenvolvimento
- ✅ Documentação técnica
- ✅ Interface otimizada
- ✅ Navegação reorganizada