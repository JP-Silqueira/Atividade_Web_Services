# Aplicação REST — Consulta de CEP (ViaCEP / JSON)

Aplicação cliente desenvolvida em **Node.js** (sem dependências externas) para demonstrar o consumo prático de uma API **REST** pública no padrão **JSON**, utilizando o serviço **ViaCEP**.

---

## Pré-requisitos

- **Node.js** versão 18 ou superior (utiliza `fetch` e `node:readline/promises` nativos, sem necessidade de `npm install`).
- Conexão com a internet para consultar a API pública.

---

## Instruções de Execução

O código está em [`app_rest.js`](app_rest.js).

A partir desta pasta (`rest/`):

```bash
node app_rest.js
```

Ou a partir da raiz do repositório:

```bash
node rest/app_rest.js
```

Ao iniciar, a aplicação solicitará no terminal que você digite o CEP desejado (por exemplo, `01001000` ou `01001-000`), fará a requisição `GET` para a API ViaCEP e exibirá tanto o JSON bruto recebido quanto os dados de endereço processados.

---

## Documentação Oficial da API

- **ViaCEP — Consulta de CEPs:**  
  https://viacep.com.br/

---

## Exemplo Real de Resposta JSON

Requisição realizada para `https://viacep.com.br/ws/01001000/json/`:

```json
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "complemento": "lado ímpar",
  "unidade": "",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "estado": "São Paulo",
  "regiao": "Sudeste",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}
```
