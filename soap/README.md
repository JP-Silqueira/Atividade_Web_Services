# Aplicação SOAP — Conversão de Números por Extenso (XML / WSDL)

Aplicação cliente desenvolvida em **Node.js** (sem dependências externas) para demonstrar o consumo prático de um Web Service **SOAP** público baseado em **XML / WSDL**, utilizando o serviço **NumberConversion**.

---

## Pré-requisitos

- **Node.js** versão 18 ou superior (utiliza `fetch` e `node:readline/promises` nativos, sem necessidade de `npm install`).
- Conexão com a internet para consultar o Web Service público.

---

## Instruções de Execução

O código está em [`app_soap.js`](app_soap.js).

A partir desta pasta (`soap/`):

```bash
node app_soap.js
```

Ou a partir da raiz do repositório:

```bash
node soap/app_soap.js
```

Ao iniciar, a aplicação solicitará no terminal que você digite um número inteiro (por exemplo, `125`), enviará uma requisição `POST` com o envelope XML (`Content-Type: text/xml; charset=utf-8`) e exibirá tanto o bloco XML bruto recebido quanto o resultado convertido por extenso em inglês.

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
