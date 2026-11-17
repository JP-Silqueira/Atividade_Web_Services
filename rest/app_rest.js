// Aplicacao 1: Consumo de API REST Publica (Padrao JSON) com Interface Web
// Servico escolhido: ViaCEP (https://viacep.com.br/)
// Como executar: node rest/app_rest.js (e abrir http://localhost:3001 no navegador)

const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const { exec } = require("node:child_process");

const PORT = 3001;

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

async function consultarViaCep(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  console.log(`\nConsultando API REST (ViaCEP) para o CEP: ${cep}...`);

  // 1. Faz a requisicao HTTP GET para a API publica
  const resposta = await fetch(url);
  if (!resposta.ok) {
    throw new Error(`API ViaCEP retornou status HTTP ${resposta.status}`);
  }

  // 2. Converte o corpo da resposta para objeto JSON
  const dados = await resposta.json();

  // 3. Exibe o texto JSON real e os dados processados no terminal
  console.log("=== TEXTO JSON REAL RECEBIDO ===");
  console.log(JSON.stringify(dados, null, 2));

  console.log("\n=== DADOS PROCESSADOS ===");
  if (dados.erro) {
    console.log("CEP nao encontrado.");
  } else {
    console.log(`Logradouro : ${dados.logradouro}`);
    console.log(`Bairro     : ${dados.bairro}`);
    console.log(`Cidade/UF  : ${dados.localidade} - ${dados.uf}`);
    console.log(`DDD        : ${dados.ddd}`);
  }

  return dados;
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

  if (req.method === "GET" && reqUrl.pathname === "/api/cep") {
    const entrada = reqUrl.searchParams.get("cep") || "";
    const cep = entrada.replace(/\D/g, "");

    if (cep.length !== 8) {
      enviarJson(res, 400, {
        erro: true,
        mensagem: "Informe um CEP valido com 8 digitos."
      });
      return;
    }

    try {
      const dados = await consultarViaCep(cep);
      enviarJson(res, 200, dados);
    } catch (erro) {
      console.error("Erro ao consumir a API REST:", erro.message);
      enviarJson(res, 502, {
        erro: true,
        mensagem: "Erro ao consultar a API ViaCEP: " + erro.message
      });
    }
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Rota nao encontrada.");
});

server.listen(PORT, () => {
  const urlLocal = `http://localhost:${PORT}`;
  console.log(`Aplicacao REST rodando em: ${urlLocal}`);
  console.log("Abrindo o navegador automaticamente... (Ctrl+C para encerrar)");
  abrirNavegador(urlLocal);
});
