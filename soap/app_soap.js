// Aplicacao 2: Consumo de Web Service SOAP Publico (Padrao XML baseado em WSDL)
// Servico escolhido: DataAccess NumberConversion (Converte numero para extenso em ingles)
// WSDL: https://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL
// Como executar: node soap/app_soap.js

const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const endpointSoap = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso";

async function converterNumeroSoap() {
  const rl = readline.createInterface({ input, output });
  const entrada = await rl.question("Digite um numero inteiro para converter por extenso: ");
  rl.close();

  const numero = entrada.trim().replace(/\D/g, "");

  if (!numero) {
    console.log("Nenhum numero valido foi informado.");
    return;
  }

  // 1. Monta o Envelope XML exigido pelo contrato WSDL (Operacao: NumberToWords)
  const xmlEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
      <ubiNum>${numero}</ubiNum>
    </NumberToWords>
  </soap:Body>
</soap:Envelope>`;

  console.log(`\nConsultando Web Service SOAP para o numero: ${numero}...\n`);

  try {
    // 2. Envia a requisicao HTTP POST com Content-Type text/xml
    const resposta = await fetch(endpointSoap, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml; charset=utf-8"
      },
      body: xmlEnvelope
    });

    // 3. Recebe a resposta como texto XML
    const xmlResposta = await resposta.text();

    // 4. Exibe o bloco XML real recebido do Web Service SOAP
    console.log("=== BLOCO XML REAL RECEBIDO ===");
    console.log(xmlResposta.trim());

    // 5. Extrai o valor da tag <m:NumberToWordsResult> (ou <NumberToWordsResult>)
    const match = xmlResposta.match(/<[^>]*NumberToWordsResult[^>]*>(.*?)<\/[^>]*NumberToWordsResult>/);
    const resultadoExtenso = match ? match[1].trim() : "Nao foi possivel extrair o resultado";

    console.log("\n=== DADOS PROCESSADOS ===");
    console.log(`Numero enviado       : ${numero}`);
    console.log(`Resultado por extenso: ${resultadoExtenso}`);
  } catch (erro) {
    console.error("Erro ao consumir o Web Service SOAP:", erro.message);
  }
}

converterNumeroSoap();
