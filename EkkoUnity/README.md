# 🎮 EKKO Unity - Backend API

Sistema backend para integração com simulação Unity do projeto EKKO.

## 📁 Arquivos Essenciais

```
EkkoUnity/
├── start_atlas_api.py     # API principal com MongoDB Atlas
├── requirements_unity.txt # Dependências Python
├── .env                   # Configurações (não commitado)
├── .env.example           # Exemplo de configurações
├── README.md              # Esta documentação
├── PROGRESSO.md           # Status do desenvolvimento
└── UNITY.md               # Especificações para Unity
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
| GET | `/unity/login/{unity_id}` | Login por Unity ID |
| GET | `/unity/dashboard/{unity_id}` | Dados completos do dashboard |
| POST | `/unity/soil/save/{unity_id}` | Salvar dados de solo do Unity |
| GET | `/unity/analise-ia/{unity_id}` | Análise IA avançada (9 parâmetros) |
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
9. **Performance Unity** - Score do jogo

## 🗄️ Banco de Dados

- **MongoDB Atlas** - Nuvem
- **Collections**:
  - `Python_userData` - Perfis de usuários
  - `Unity_soilData` - Dados de solo do Unity

## 🔧 Tecnologias

- **Python 3.x** - Linguagem principal
- **FastAPI** - Framework web
- **PyMongo** - Driver MongoDB
- **MongoDB Atlas** - Banco na nuvem
- **Uvicorn** - Servidor ASGI