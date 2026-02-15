/* Descrição da Atividade Nesta atividade, você deverá desenvolver um programa
em JavaScript responsável por realizar um CRUD (Create, Read, Update e Delete)
de veículos.

Todas as interações com o usuário devem ser realizadas exclusivamente através de
prompt, e as informações devem ser exibidas utilizando console.log e/ou alert,
conforme necessário.
 */

/* Requisitos Gerais Cada veículo deve possuir os seguintes dados:

Identificador (ID) Modelo Marca Ano Cor Preço

Os veículos devem ser armazenados em uma lista (array).

Cada veículo deve possuir um identificador único, gerado automaticamente pelo
sistema.

A lista de veículos deve estar ordenada pelo preço.

A funcionalidade de filtro deve ser realizada por marca e apresentar os veículos
ordenados pelo preço.

Apenas os campos cor e preço podem ser atualizados.

O sistema deve sempre retornar ao menu inicial após a execução de uma ação. */

import PromptSync from "prompt-sync";
const prompt = PromptSync();

let listaVeiculos = [];
let proximoId = 1;

// --- Funções Auxiliares ---

// Regra: Sempre manter a lista principal ordenada por preço
function ordenarPorPreco() {
  listaVeiculos.sort((a, b) => a.preco - b.preco);
}

// --- Funcionalidades do CRUD ---

// 1. Criar Veículo
function criarVeiculo() {
  console.log("\n--- CADASTRO DE NOVO VEÍCULO ---");
  const modelo = prompt("Modelo: ");
  const marca = prompt("Marca: ");
  const ano = parseInt(prompt("Ano: "));
  const cor = prompt("Cor: ");
  const preco = parseFloat(
    prompt("Preço (ex: 50000.00): "),
  );

  // Validação rigorosa
  if (
    !modelo ||
    !marca ||
    isNaN(ano) ||
    !cor ||
    isNaN(preco)
  ) {
    console.log(
      "❌ Erro: Dados inválidos. Certifique-se de usar números para ano e preço.",
    );
    return;
  }

  // Criando o objeto com nomes padronizados
  const veiculo = {
    id: proximoId++,
    modelo,
    marca,
    ano,
    cor,
    preco,
  };

  listaVeiculos.push(veiculo);
  ordenarPorPreco();
  console.log(`✅ ${modelo} adicionado com sucesso!`);
}

// 2. Listar Veículos
function listarVeiculos() {
  if (listaVeiculos.length === 0) {
    console.log("\n📭 NENHUM VEÍCULO CADASTRADO.");
    return;
  }

  console.log(
    "\n===========================================",
  );
  console.log("--- LISTA DE VEÍCULOS (ORDEM DE PREÇO) ---");
  listaVeiculos.forEach((v) => {
    console.log(
      `ID: ${v.id} | ${v.modelo.padEnd(10)} | ${v.marca.padEnd(10)} | ${v.ano} | ${v.cor.padEnd(8)} | R$ ${v.preco.toFixed(2)}`,
    );
  });
  console.log(
    "===========================================\n",
  );
}

// 3. Filtrar por Marca
function filtrarPorMarca() {
  if (listaVeiculos.length === 0) {
    console.log("\nLista vazia.");
    return;
  }

  const busca = prompt(
    "Digite a marca desejada: ",
  ).toLowerCase();
  const filtrados = listaVeiculos.filter(
    (v) => v.marca.toLowerCase() === busca,
  );

  if (filtrados.length === 0) {
    console.log(
      `\nNenhum veículo da marca "${busca}" encontrado.`,
    );
    return;
  }

  console.log(
    `\n--- RESULTADOS PARA: ${busca.toUpperCase()} ---`,
  );
  filtrados.forEach((v) => {
    console.log(
      `ID: ${v.id} | Modelo: ${v.modelo} | Cor: ${v.cor} | Preço: R$ ${v.preco.toFixed(2)}`,
    );
  });
}

// 4. Atualizar Veículo
function atualizarVeiculo() {
  const id = parseInt(
    prompt("Digite o ID do veículo para atualizar: "),
  );
  const veiculo = listaVeiculos.find((v) => v.id === id);

  if (!veiculo) {
    console.log("❌ Veículo não encontrado.");
    return;
  }

  console.log(
    `\nEditando: ${veiculo.modelo} (${veiculo.marca})`,
  );
  const novaCor = prompt(
    `Nova cor (atual: ${veiculo.cor}) [Vazio p/ manter]: `,
  );
  const novoPreco = prompt(
    `Novo preço (atual: ${veiculo.preco}) [Vazio p/ manter]: `,
  );

  if (novaCor) veiculo.cor = novaCor;
  if (novoPreco) veiculo.preco = parseFloat(novoPreco);

  ordenarPorPreco();
  console.log("✅ Veículo atualizado!");
}

// 5. Remover Veículo
function removerVeiculo() {
  const id = parseInt(prompt("Digite o ID para remover: "));
  const index = listaVeiculos.findIndex((v) => v.id === id);

  if (index === -1) {
    console.log("❌ ID não encontrado.");
    return;
  }

  const confirmacao = prompt(
    `Tem certeza que deseja remover o ${listaVeiculos[index].modelo}? (s/n): `,
  ).toLowerCase();

  if (confirmacao === "s") {
    const removido = listaVeiculos.splice(index, 1);
    console.log(
      `✅ ${removido[0].modelo} removido da frota.`,
    );
  } else {
    console.log("Ação cancelada.");
  }
}

// --- Menu de Controle ---
function exibirMenu() {
  let rodando = true;
  while (rodando) {
    console.log(`
    ____________________________
    |   MENU VESTE TECH        |
    | 1. Cadastrar Veículo     |
    | 2. Listar Veículos       |
    | 3. Filtrar por Marca     |
    | 4. Atualizar (Cor/Preço) |
    | 5. Remover Veículo       |
    | 6. Sair                  |
    |__________________________|
    `);

    const opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        criarVeiculo();
        break;
      case "2":
        listarVeiculos();
        break;
      case "3":
        filtrarPorMarca();
        break;
      case "4":
        atualizarVeiculo();
        break;
      case "5":
        removerVeiculo();
        break;
      case "6":
        console.log("Encerrando sistema...");
        rodando = false;
        break;
      default:
        console.log("⚠️ Opção inválida!");
    }
  }
}

exibirMenu();
