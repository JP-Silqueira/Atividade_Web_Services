# Aplicação REST — Consulta de CEP (ViaCEP / JSON)

Aplicação cliente com **interface web** desenvolvida em **Node.js** (sem dependências externas) para demonstrar o consumo prático de uma API **REST** pública no padrão **JSON**, utilizando o serviço **ViaCEP**.

---

## Pré-requisitos

- **Node.js** versão 18 ou superior (utiliza `fetch`, `node:http` e `node:fs` nativos, sem necessidade de `npm install`).
- Conexão com a internet para consultar a API pública.

---

## Instruções de Execução e Uso da Página Web

Os arquivos da aplicação estão em [`app_rest.js`](app_rest.js) (servidor local e consumo da API) e [`index.html`](index.html) (página web).

1. **Inicie o servidor local:**

   A partir desta pasta (`rest/`):

   ```bash
   node app_rest.js
   ```

   Ou a partir da raiz do repositório:

   ```bash
   node rest/app_rest.js
   ```

2. **Acesse a página web:**

   O navegador padrão abrirá automaticamente no endereço:

   ```text
   http://localhost:3001
   ```

   *(Caso não abra automaticamente, acesse esse endereço manualmente no navegador.)*

3. **Como usar:**
   - Digite o CEP desejado no campo de busca (com ou sem traço, por exemplo `01001-000` ou `01001000`).
   - Clique em **Consultar CEP**.
   - A página exibirá os **Dados Processados** (Logradouro, Bairro, Cidade/UF e DDD) e o **Texto JSON Real Recebido** da API ViaCEP (que também é registrado no terminal).

*(Para encerrar o servidor no terminal, pressione `Ctrl + C`.)*

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
