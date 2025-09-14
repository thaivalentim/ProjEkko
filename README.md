# 🌱 EKKO - Sistema que promove a sustentabilidade

O EKKO é um projeto que utiliza de uma **Simulação Gamificada** desenvolvida na Unity e de uma **Aplicação Web** para monitoramento de parâmetros do solo e consulta à análises de IA para ensinar conceitos de agricultura de precisão e promover a sustentabilidade.

## 🎮 **Sistema Integrado**

Sistema completo com simulação desenvolvida na Unity para experiência gamificada e aprendizado da agricultura.

### 🚀 Início Rápido

```bash
# 1. Configurar Backend
cd Backend
cp .env.example .env
# Editar .env com suas credenciais MongoDB

# 2. Instalar dependências
pip install -r requirements_unity.txt

# 3. Iniciar API
python start_atlas_api.py

# 4. Frontend
cd ../Frontend
# Abrir pages/index.html no navegador
```

**Acesso**: http://localhost:8002 | **Dashboard**: `Frontend/pages/index.html` | **Docs**: http://localhost:8002/docs

## 📁 Estrutura Atual

```
ProjEkko/
├── Backend/                # 🎮 Sistema (ATIVO)
│   ├── start_atlas_api.py  # API principal MongoDB Atlas
│   ├── requirements_unity.txt
│   ├── .env.example        # Configurações de ambiente
│   ├── .env                # Suas credenciais (não versionado)
│   ├── README.md           # Documentação completa
│   ├── PROGRESSO.md        # Status desenvolvimento
│   └── UNITY.md            # Especificações para Unity
├── Frontend/               # 🎨 Interface (ATIVO)
│   ├── pages/              # HTML pages
│   ├── css/                # Estilos modernos (modularizado)
│   ├── js/                 # JavaScript modular
│   ├── assets/             # Imagens e recursos
│   ├── README.md           # Documentação frontend
│   └── PROGRESSO.md        # Status frontend
├── Obsoleto/               # 📦 Arquivos antigos
│   ├── EkkoAPI/            # API original
│   ├── EkkoPython/         # Gerador original
│   ├── frontend/           # Frontend original
│   └── tests/              # Testes originais
└── README.md               # Esta documentação
```

## ✅ Sistema e Funcionalidades

### 🔧 **Backend (Backend/)**
- **API FastAPI** com MongoDB Atlas
- **Sistema IA Avançado** - 9 parâmetros de solo
- **Autenticação** - Login simples
- **Análise Completa** - pH, umidade, temperatura, salinidade, NPK, condutividade, performance 
- **Previsões Inteligentes** - Colheita, economia, sustentabilidade
- **Alertas Automáticos** - Parâmetros críticos
- **Recomendações Personalizadas** - Por região e cultivo
- **Testes API** - Postman

### 🎨 **Frontend (Frontend/)**
- **Dashboard Moderno** - Minimalista e profissional
- **7 Seções Completas** - Início, Perfil, Simulação, IA & Solo, Estatísticas, Monitoramento, Desenvolvimento
- **Visualizações Avançadas** - Mapas de calor, timeline, gráficos
- **Design Responsivo** - Desktop, tablet, mobile
- **UX Otimizada** - Loading states, error handling, navegação fluida
- **Documentação Técnica** - Seção 'desenvolvimento' completa

### 🧠 **IA Avançada - 9 Parâmetros**
1. **pH do Solo** (6.0-7.0)
2. **Umidade** (40-70%)
3. **Temperatura** (20-30°C)
4. **Salinidade** (< 600 ppm)
5. **Nitrogênio** (20-100 mg/kg)
6. **Fósforo** (15-50 mg/kg)
7. **Potássio** (100-250 mg/kg)
8. **Condutividade** (< 1.5 dS/m)
9. **Performance Simulação** (> 800 pts)

## 🎯 Para Desenvolvedores 

### 📋 **Dados Necessários**
Consulte `Backend/UNITY.md` para especificações completas.

- **Parâmetros de Solo** - pH, umidade, temperatura, salinidade, condutividade e outros
- **Nutrientes** - NPK (nitrogênio, fósforo, potássio)
- **Ações do Jogador** - Irrigação, fertilizantes aplicados
- **Métricas do Jogo** - Score, dinheiro gasto, sustentabilidade
- **Metadados** - Session ID, User ID

### 🔗 **Endpoint Principal**
```http
POST http://localhost:8002/unity/soil/save/{user_id}
```

## 📊 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/unity/status` | Status da API e banco |
| GET | `/unity/login/{user_id}` | Login por ID do usuário |
| GET | `/unity/dashboard/{user_id}` | Dados completos dashboard |
| POST | `/unity/soil/save/{user_id}` | Salvar dados da simulação |
| GET | `/unity/analise-ia/{user_id}` | Análise IA (9 parâmetros) |
| GET | `/unity/recreate-test-data` | Recriar dados teste |

## 📊 Métricas do Projeto

- **Linhas de Código**: 3k+
- **Arquivos JS/CSS**: 15+ (modularizados)
- **Coleções MongoDB**: 3
- **Endpoints API**: 8
- **Segurança**: Variáveis de ambiente
- **Tempo de Desenvolvimento**: 3 meses
- **Equipe**: 34DS08 - Desenvolvimento de Sistemas

## 🛠️ Stack Tecnológica

- **Backend**: Python 3.x, FastAPI, PyMongo, MongoDB Atlas
- **Frontend**: HTML5, CSS3 (Glassmorphism), JavaScript (Vanilla), Chart.js
- **IA**: Análise baseada em regras agronômicas brasileiras
- **Banco de Dados**: MongoDB Atlas (nuvem)
- **Design**: Profissional e minimalista
- **Localização**: Santa Rita do Sapucaí, MG

## 🏆 Status do Projeto

| Sistema | Status | Funcionalidade |
|---------|--------|----------------|
| **Backend** | ✅ Concluído | API completa + IA |
| **Frontend** | ✅ Concluído | Dashboard moderno |
| **Simulação** | 🔧 Desenvolvimento | Simulação |
| **Premiação** | 🕒 Aguardando... | 44ª Projete ETE FMC |
| **Sistema Original** | 📦 Obsoleto | Movido para /Obsoleto |

## 🚀 Próximos Passos

- [ ] **Integração Completa** - Conectar simulação Unity
- [ ] **44ª Projete** - Apresentação na feira
- [ ] **Otimização da Performance** - Cache e otimizações
- [ ] **Monitoramento Real** - Sensores IoT

## 📈 Evolução do Projeto

1. **v1.0** - Sistema original Python + FastAPI ✅
2. **v2.0** - **Integração com Unity** e IA avançada ✅
3. **v3.0** - Integração completa Unity (em desenvolvimento)

---

**EKKO** - Agricultura Gamificada 🎮🌾 | **Santa Rita do Sapucaí, MG** |

### 📞 Suporte
- **Backend**: `Backend/README.md`
- **Frontend**: `Frontend/README.md`
- **Especificações Unity**: `Backend/UNITY.md`
- **Sistema Original**: `Obsoleto/` (arquivado)

### 🔒 Segurança
- **Variáveis de Ambiente**: Configure `.env` com suas credenciais
- **Não versione**: Arquivo `.env` está no `.gitignore`
- **Exemplo**: Use `.env.example` como template