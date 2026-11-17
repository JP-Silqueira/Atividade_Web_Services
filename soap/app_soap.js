// Aplicacao 2: Consumo de Web Service SOAP Publico (Padrao XML baseado em WSDL) com Interface Web
// Servico escolhido: DataAccess NumberConversion (Converte numero para extenso em ingles)
// WSDL: https://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL
// Como executar: node soap/app_soap.js (e abrir http://localhost:3002 no navegador)

const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const { exec } = require("node:child_process");

const PORT = 3002;
const endpointSoap = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso";

function abrirNavegador(url) {
  const comando =
    process.platform === "win32"
      ? `start "" "${url}"`
      : process.platform === "darwin"
      ? `open "${url}"`
      : `xdg-open "${url}"`;

  exec(comando, () => {});
}

function enviarJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

async function converterNumeroSoap(numero) {
  // 1. Monta o Envelope XML exigido pelo contrato WSDL (Operacao: NumberToWords)
  const xmlEnvelope = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
      <ubiNum>${numero}</ubiNum>
    </NumberToWords>
  </soap:Body>
</soap:Envelope>`;

  console.log(`\nConsultando Web Service SOAP para o numero: ${numero}...`);

  // 2. Envia a requisicao HTTP POST com Content-Type text/xml
  const resposta = await fetch(endpointSoap, {
    method: "POST",
    headers: {
      "Content-Type": "text/xml; charset=utf-8"
    },
    body: xmlEnvelope
  });

  if (!resposta.ok) {
    throw new Error(`Web Service SOAP retornou status HTTP ${resposta.status}`);
  }

  // 3. Recebe a resposta como texto XML
  const xmlResposta = await resposta.text();
  const xmlRecebido = xmlResposta.trim();

  // 4. Exibe o bloco XML real recebido no terminal
  console.log("=== BLOCO XML REAL RECEBIDO ===");
  console.log(xmlRecebido);

  // 5. Extrai o valor da tag <m:NumberToWordsResult> (ou <NumberToWordsResult>)
  const match = xmlResposta.match(/<[^>]*NumberToWordsResult[^>]*>(.*?)<\/[^>]*NumberToWordsResult>/);
  const resultadoExtenso = match ? match[1].trim() : "Nao foi possivel extrair o resultado";

  console.log("\n=== DADOS PROCESSADOS ===");
  console.log(`Numero enviado       : ${numero}`);
  console.log(`Resultado por extenso: ${resultadoExtenso}`);

  return {
    numero,
    resultadoExtenso,
    xmlEnviado: xmlEnvelope,
    xmlRecebido
  };
}

const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, `http://localhost:${PORT}`);

  if (req.method === "GET" && reqUrl.pathname === "/") {
    try {
      const html = await fs.readFile(path.join(__dirname, "index.html"), "utf-8");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
    } catch (erro) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Erro ao carregar index.html: " + erro.message);
    }
    return;
  }

  if (req.method === "GET" && reqUrl.pathname === "/api/soap") {
    const entrada = reqUrl.searchParams.get("numero") || "";
    const numero = entrada.trim().replace(/\D/g, "");

    if (!numero) {
      enviarJson(res, 400, {
        erro: "Informe um numero inteiro valido."
      });
      return;
    }

    try {
      const resultado = await converterNumeroSoap(numero);
      enviarJson(res, 200, resultado);
    } catch (erro) {
      console.error("Erro ao consumir o Web Service SOAP:", erro.message);
      enviarJson(res, 502, {
        erro: "Erro ao consultar o Web Service SOAP: " + erro.message
      });
    }
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Rota nao encontrada.");
});

server.listen(PORT, () => {
  const urlLocal = `http://localhost:${PORT}`;
  console.log(`Aplicacao SOAP rodando em: ${urlLocal}`);
  console.log("Abrindo o navegador automaticamente... (Ctrl+C para encerrar)");
  abrirNavegador(urlLocal);
});
