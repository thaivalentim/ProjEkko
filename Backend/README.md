# 🎮 EKKO - Backend API

Sistema backend para integração com simulação desenvolvida na Unity.

## 📁 Arquivos Essenciais

```
Backend/
├── start_atlas_api.py     # API principal com MongoDB Atlas
├── requirements_unity.txt # Dependências Python
├── .env                   # Configurações (não commitado)
├── .env.example           # Exemplo de configurações
├── README.md              # Esta documentação
├── PROGRESSO.md           # Status do desenvolvimento
└── UNITY.md               # Especificações para integração da simulação
```

## 🚀 Como Usar

### 1. Instalar Dependências
```bash
pip install -r requirements_unity.txt
```

### 2. Configurar .env
```bash
cp .env.example .env
# Editar .env com suas credenciais MongoDB Atlas
```

**Exemplo .env:**
```env
# MongoDB Atlas
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGO_DB_NAME=EkkoDatabase

# API Configuration
API_HOST=0.0.0.0
API_PORT=8002
API_DEBUG=False
```

### 3. Executar API
```bash
python start_atlas_api.py
```

### 4. Acessar
- **API**: http://localhost:8002
- **Docs**: http://localhost:8002/docs
- **Status**: http://localhost:8002/unity/status

## 🔗 Endpoints Principais

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/unity/status` | Status da API e banco |
| GET | `/unity/login/{user_id}` | Login por ID do usuário |
| GET | `/unity/dashboard/{user_id}` | Dados completos do dashboard |
| POST | `/unity/soil/save/{user_id}` | Salvar dados de solo da simulação |
| GET | `/unity/analise-ia/{user_id}` | Análise IA avançada (9 parâmetros) |
| GET | `/unity/recreate-test-data` | Recriar dados de teste |

## 🧠 Sistema IA

Analisa **9 parâmetros** em grade 3x3:
1. **pH do Solo** - Acidez/alcalinidade
2. **Umidade** - Teor de água no solo
3. **Temperatura** - Temperatura do solo
4. **Salinidade** - Concentração de sais
5. **Nitrogênio (N)** - Nutriente primário
6. **Fósforo (P)** - Nutriente primário
7. **Potássio (K)** - Nutriente primário
8. **Condutividade** - Condutividade elétrica
9. **Performance Simulação** - Score da simulação

## 🗄️ Banco de Dados

- **MongoDB Atlas** - Nuvem
- **Collections**:
  - `Python_userData` - Perfis de usuários
  - `Unity_soilData` - Dados de solo da simulação

## 🔧 Tecnologias

- **Python 3.x** - Linguagem principal
- **FastAPI** - Framework web moderno e rápido
- **PyMongo** - Driver MongoDB
- **MongoDB Atlas** - Banco NoSQL na nuvem
- **Uvicorn** - Servidor ASGI
- **python-dotenv** - Variáveis de ambiente
- **Postman** - Testes de API

## 🔒 Segurança

- ✅ **Variáveis de Ambiente** - Credenciais não expostas no código
- ✅ **Arquivo .env** - Não versionado no Git
- ✅ **Template .env.example** - Guia de configuração
- ✅ **Validação Obrigatória** - API não inicia sem configuração
- ✅ **CORS Configurado** - Controle de acesso

## 📊 Métricas

- **Endpoints**: 8 rotas REST
- **Coleções**: 3 no banco de dados
- **Parâmetros IA**: 9 analisados
- **Desenvolvimento**: 3 meses
- **Linhas de Código**: 3k+

## 🎯 Status

- ✅ **Backend**: Concluído
- ✅ **API REST**: Funcional
- ✅ **MongoDB Atlas**: Integrado
- ✅ **Sistema IA**: Ativo
- ✅ **Autenticação**: Implementada
- ✅ **Documentação**: Completa
- ✅ **Segurança**: Variáveis de ambiente