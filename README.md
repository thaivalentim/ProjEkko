# 🌱 EKKO - Sistema de Monitoramento de Solo Inteligente

Sistema completo para análise de solo em tempo real com IA para agricultura de precisão, agora com **integração Unity** para simulação gamificada.

## 🎮 **NOVO: Unity Integration**

Sistema expandido com simulação Unity para experiência gamificada de agricultura.

### 🚀 Início Rápido Unity

```bash
# 1. Backend Unity
cd EkkoUnity
pip install -r requirements_unity.txt
python start_atlas_api.py

# 2. Frontend Unity
cd ../FrontendUnity
# Abrir pages/index.html no navegador
```

**Acesso Unity**: http://localhost:8002 | **Dashboard**: `FrontendUnity/pages/index.html` | **Docs**: http://localhost:8002/docs

## 📁 Estrutura Atual

```
ProjEkko/
├── EkkoUnity/              # 🎮 Sistema Unity (ATIVO)
│   ├── start_atlas_api.py  # API principal MongoDB Atlas
│   ├── requirements_unity.txt
│   ├── README.md           # Documentação completa
│   ├── PROGRESSO.md        # Status desenvolvimento
│   └── UNITY.md            # Especificações para Unity
├── FrontendUnity/          # 🎨 Interface Unity (ATIVO)
│   ├── pages/              # HTML pages
│   ├── css/                # Estilos modernos
│   ├── js/                 # JavaScript modular
│   ├── README.md           # Documentação frontend
│   └── PROGRESSO.md        # Status frontend
├── Obsoleto/               # 📦 Arquivos antigos
│   ├── EkkoAPI/            # API original
│   ├── EkkoPython/         # Gerador original
│   ├── frontend/           # Frontend original
│   └── tests/              # Testes originais
└── README.md               # Esta documentação
```

## ✅ Sistema Unity - Funcionalidades

### 🔧 **Backend Unity (EkkoUnity/)**
- **API FastAPI** com MongoDB Atlas
- **Sistema IA Avançado** - 9 parâmetros de solo
- **Autenticação Unity ID** - Login simples
- **Análise Completa** - pH, umidade, temperatura, salinidade, NPK, condutividade, performance
- **Previsões Inteligentes** - Colheita, economia, sustentabilidade
- **Alertas Automáticos** - Parâmetros críticos
- **Recomendações Personalizadas** - Por região e cultivo
- **Testes API** - Postman integration

### 🎨 **Frontend Unity (FrontendUnity/)**
- **Dashboard Moderno** - Tema gaming Unity
- **7 Seções Completas** - Início, Perfil, Unity, IA & Solo, Estatísticas, Monitoramento, Desenvolvimento
- **Visualizações Avançadas** - Mapas de calor, timeline, gráficos
- **Design Responsivo** - Desktop, tablet, mobile
- **UX Otimizada** - Loading states, error handling, navegação fluida
- **Documentação Técnica** - Seção desenvolvimento completa

### 🧠 **IA Avançada - 9 Parâmetros**
1. **pH do Solo** (6.0-7.0)
2. **Umidade** (40-70%)
3. **Temperatura** (20-30°C)
4. **Salinidade** (< 600 ppm)
5. **Nitrogênio** (20-100 mg/kg)
6. **Fósforo** (15-50 mg/kg)
7. **Potássio** (100-250 mg/kg)
8. **Condutividade** (< 1.5 dS/m)
9. **Performance Unity** (> 800 pts)

## 🎯 Para Desenvolvedores Unity

### 📋 **Dados Necessários**
Consulte `EkkoUnity/UNITY.md` para especificações completas:

- **Parâmetros de Solo** - pH, umidade, temperatura, salinidade, condutividade
- **Nutrientes** - NPK (nitrogênio, fósforo, potássio)
- **Ações do Jogador** - Irrigação, fertilizantes aplicados
- **Métricas do Jogo** - Score, dinheiro gasto, sustentabilidade
- **Metadados** - Session ID, Unity ID

### 🔗 **Endpoint Principal**
```http
POST http://localhost:8002/unity/soil/save/{unity_id}
```

## 📊 Endpoints Unity API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/unity/status` | Status da API e banco |
| GET | `/unity/login/{unity_id}` | Login por Unity ID |
| GET | `/unity/dashboard/{unity_id}` | Dados completos dashboard |
| POST | `/unity/soil/save/{unity_id}` | Salvar dados Unity |
| GET | `/unity/analise-ia/{unity_id}` | Análise IA (9 parâmetros) |
| GET | `/unity/recreate-test-data` | Recriar dados teste |

## 📊 Métricas do Projeto

- **Linhas de Código**: 2.5k+
- **Arquivos JS/CSS**: 15+
- **Coleções MongoDB**: 3
- **Endpoints API**: 8
- **Tempo Desenvolvimento**: 3 meses
- **Equipe**: 34DS08 - Desenvolvimento de Sistemas

## 🛠️ Stack Tecnológica Unity

- **Backend**: Python 3.x, FastAPI, PyMongo, MongoDB Atlas
- **Frontend**: HTML5, CSS3 (Glassmorphism), JavaScript (Vanilla), Chart.js
- **IA**: Análise baseada em regras agronômicas brasileiras
- **Banco**: MongoDB Atlas (nuvem)
- **Design**: Tema gaming Unity moderno
- **Localização**: Santa Rita do Sapucaí, MG

## 🏆 Status do Projeto

| Sistema | Status | Funcionalidade |
|---------|--------|----------------|
| **Backend** | ✅ Concluído | API completa + IA |
| **Frontend** | ✅ Concluído | Dashboard moderno |
| **Simulação** | 🔧 Desenvolvimento | Unity integration |
| **Premiação** | 🕒 Aguardando... | 44ª Projete ETE FMC |
| **Sistema Original** | 📦 Obsoleto | Movido para /Obsoleto |

## 🚀 Próximos Passos

- [ ] **Integração Unity Real** - Conectar simulação
- [ ] **44ª Projete** - Apresentação na feira
- [ ] **Otimização Performance** - Cache e otimizações
- [ ] **Monitoramento Real** - Sensores IoT
- [ ] **App Mobile** - PWA ou nativo
- [ ] **Machine Learning** - Modelos avançados

## 📈 Evolução do Projeto

1. **v1.0** - Sistema original Python + FastAPI ✅
2. **v2.0** - **Unity Integration** com IA avançada ✅
3. **v3.0** - Integração Unity real (em desenvolvimento)

---

**EKKO Unity** - Agricultura Gamificada 🎮🌾 | **Santa Rita do Sapucaí, MG** | **Status**: Unity Ready 🚀

### 📞 Suporte
- **Backend Unity**: `EkkoUnity/README.md`
- **Frontend Unity**: `FrontendUnity/README.md`
- **Especificações Unity**: `EkkoUnity/UNITY.md`
- **Sistema Original**: `Obsoleto/` (arquivado)