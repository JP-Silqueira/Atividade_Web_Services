// Aplicacao 1: Consumo de API REST Publica (Padrao JSON)
// Servico escolhido: ViaCEP (https://viacep.com.br/)
// Como executar: node rest/app_rest.js

const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

async function consultarCep() {
  const rl = readline.createInterface({ input, output });
  const entrada = await rl.question("Digite o CEP para consulta: ");
  rl.close();

  // Remove tracos, pontos ou espacos caso o usuario digite no formato 00000-000
  const cep = entrada.replace(/\D/g, "");

  if (!cep) {
    console.log("Nenhum CEP valido foi informado.");
    return;
  }

  const url = `https://viacep.com.br/ws/${cep}/json/`;
  console.log(`\nConsultando API REST (ViaCEP) para o CEP: ${cep}...\n`);

  try {
    // 1. Faz a requisicao HTTP GET
    const resposta = await fetch(url);

    // 2. Converte o corpo da resposta para objeto JSON
    const dados = await resposta.json();

    // 3. Exibe o texto JSON real recebido da API
    console.log("=== TEXTO JSON REAL RECEBIDO ===");
    console.log(JSON.stringify(dados, null, 2));

    // 4. Exibe os dados interpretados pela aplicacao
    console.log("\n=== DADOS PROCESSADOS ===");
    if (dados.erro) {
      console.log("CEP nao encontrado.");
    } else {
      console.log(`Logradouro : ${dados.logradouro}`);
      console.log(`Bairro     : ${dados.bairro}`);
      console.log(`Cidade/UF  : ${dados.localidade} - ${dados.uf}`);
      console.log(`DDD        : ${dados.ddd}`);
    }
  } catch (erro) {
    console.error("Erro ao consumir a API REST:", erro.message);
  }
}

consultarCep();
