# 🎮 UNITY - Especificações de Integração

Dados que o Unity deve enviar para alimentar o sistema EKKO.

## 🔗 Endpoint Principal

**POST** `http://localhost:8002/unity/soil/save/{unity_id}`

## 📊 Dados Obrigatórios

### 1. **Parâmetros de Solo** (soil_parameters)
```json
{
  "ph": 6.4,                    // float: 0.0-14.0 (ideal: 6.0-7.0)
  "umidade": 58.0,              // float: 0-100% (ideal: 40-70%)
  "temperatura": 25.2,          // float: °C (ideal: 20-30°C)
  "salinidade": 380,            // int: ppm (ideal: < 600)
  "condutividade": 1.2          // float: dS/m (ideal: < 1.5)
}
```

### 2. **Nutrientes** (nutrients)
```json
{
  "nitrogenio": 52,             // int: mg/kg (ideal: 20-100)
  "fosforo": 28,                // int: mg/kg (ideal: 15-50)
  "potassio": 165               // int: mg/kg (ideal: 100-250)
}
```

### 3. **Ações do Jogador** (player_actions)
```json
{
  "irrigacao": 70,              // int: 0-100% (quantidade aplicada)
  "fertilizante_npk": {         // Fertilizantes aplicados
    "N": 25,                    // int: kg/ha
    "P": 18,                    // int: kg/ha
    "K": 30                     // int: kg/ha
  }
}
```

### 4. **Métricas do Jogo** (game_metrics)
```json
{
  "score": 920,                 // int: pontuação (ideal: > 800)
  "money_spent": 1450.75,       // float: R$ gastos na sessão
  "sustainability_index": 85    // int: 0-100% (opcional)
}
```

### 5. **Metadados da Sessão**
```json
{
  "session_id": "session_123",  // string: ID único da sessão
  "unity_id": "unity_abc123"    // string: ID do jogador Unity
}
```

## 📝 Exemplo Completo

```json
{
  "session_id": "session_20250108_001",
  "ph": 6.4,
  "umidade": 58.0,
  "temperatura": 25.2,
  "salinidade": 380,
  "nitrogenio": 52,
  "fosforo": 28,
  "potassio": 165,
  "player_actions": {
    "irrigacao": 70,
    "fertilizante_npk": {
      "N": 25,
      "P": 18,
      "K": 30
    }
  },
  "game_metrics": {
    "score": 920,
    "money_spent": 1450.75,
    "sustainability_index": 85
  }
}
```

## 🎯 Fluxo de Integração

### 1. **Registro do Jogador**
```http
POST /unity/profile/create
{
  "nome": "Nome do Jogador",
  "email": "email@exemplo.com",
  "telefone": "(35) 99999-0000",
  "cpf": "000.000.000-00",
  "propriedade": {
    "nome": "Fazenda Unity",
    "area_hectares": 50.0,
    "localizacao": "Santa Rita do Sapucaí, MG",
    "cultivos_principais": ["Milho", "Soja"]
  }
}
```
**Retorna**: `unity_id` único

### 2. **Durante o Jogo**
A cada mudança significativa ou fim de sessão:
```http
POST /unity/soil/save/{unity_id}
[Dados do exemplo acima]
```

### 3. **Visualização no Dashboard**
Jogador acessa: `http://localhost:3000/dashboard.html?unityId={unity_id}`

## 🔍 Validações Automáticas

O sistema automaticamente:
- ✅ Valida ranges dos parâmetros
- ✅ Calcula saúde geral do solo
- ✅ Gera alertas críticos
- ✅ Cria recomendações personalizadas
- ✅ Prevê produtividade
- ✅ Analisa sustentabilidade

## 🚨 Parâmetros Críticos

**Alertas automáticos quando:**
- pH < 5.5 ou > 7.5
- Umidade < 30% ou > 80%
- Temperatura < 15°C ou > 35°C
- Salinidade > 1000 ppm
- Condutividade > 2.5 dS/m
- Nutrientes < 50% do mínimo ideal

## 📱 Teste Rápido

**Criar dados de teste:**
```http
GET /unity/recreate-test-data
```

**Testar IA:**
```http
GET /unity/analise-ia/unity_test123
```

---
**Atualizado em**: 8 de setembro de 2025