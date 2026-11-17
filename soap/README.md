# Aplicação SOAP — Conversão de Números por Extenso (XML / WSDL)

Aplicação cliente com **interface web** desenvolvida em **Node.js** (sem dependências externas) para demonstrar o consumo prático de um Web Service **SOAP** público baseado em **XML / WSDL**, utilizando o serviço **NumberConversion**.

---

## Pré-requisitos

- **Node.js** versão 18 ou superior (utiliza `fetch`, `node:http` e `node:fs` nativos, sem necessidade de `npm install`).
- Conexão com a internet para consultar o Web Service público.

---

## Instruções de Execução e Uso da Página Web

Os arquivos da aplicação estão em [`app_soap.js`](app_soap.js) (servidor local e consumo do Web Service SOAP) e [`index.html`](index.html) (página web).

1. **Inicie o servidor local:**

   A partir desta pasta (`soap/`):

   ```bash
   node app_soap.js
   ```

   Ou a partir da raiz do repositório:

   ```bash
   node soap/app_soap.js
   ```

2. **Acesse a página web:**

   O navegador padrão abrirá automaticamente no endereço:

   ```text
   http://localhost:3002
   ```

   *(Caso não abra automaticamente, acesse esse endereço manualmente no navegador.)*

3. **Como usar:**
   - Digite um número inteiro no campo indicado (por exemplo, `125` ou `2026`).
   - Clique em **Converter para Extenso**.
   - A página exibirá os **Dados Processados** (número enviado e resultado por extenso em inglês), o **Envelope XML Enviado** e o **Bloco XML Real Recebido** do Web Service SOAP (que também é registrado no terminal).

*(Para encerrar o servidor no terminal, pressione `Ctrl + C`.)*

---

## Documentação Oficial e Contrato WSDL

- **Documentação do Web Service SOAP (NumberConversion — DataAccess Web Services):**  
  https://www.dataaccess.com/webservicesserver/NumberConversion.wso
- **Link direto para o arquivo `.wsdl`:**  
  https://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL

---

## Exemplo Real de Resposta XML

Requisição realizada para `https://www.dataaccess.com/webservicesserver/NumberConversion.wso` (operação `NumberToWords` com `<ubiNum>125</ubiNum>`):

```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <m:NumberToWordsResponse xmlns:m="http://www.dataaccess.com/webservicesserver/">
      <m:NumberToWordsResult>one hundred and twenty five </m:NumberToWordsResult>
    </m:NumberToWordsResponse>
  </soap:Body>
</soap:Envelope>
```
