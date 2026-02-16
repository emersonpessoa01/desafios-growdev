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
const ordenarPorPreco = () => {
  listaVeiculos.sort((a, b) => a.preco - b.preco);
};

// --- Funcionalidades do CRUD ---

// 1. Criar Veículo
const criarVeiculo = () => {
  let continuar = "s";

  do {
    console.log("\n--- CADASTRO DE NOVO VEÍCULO ---");
    const modelo = prompt("Modelo: ");
    const marca = prompt("Marca: ");
    const ano = parseInt(prompt("Ano: "));
    const cor = prompt("Cor: ");
    const preco = parseFloat(prompt("Preço (ex: 50000): "));

    if (
      !modelo ||
      !marca ||
      isNaN(ano) ||
      !cor ||
      isNaN(preco)
    ) {
      console.log(
        "❌ Erro: Dados inválidos. Operação cancelada para este veículo.",
      );
    } else {
      const veiculo = {
        id: proximoId++,
        modelo,
        marca,
        ano,
        cor,
        preco,
      };

      listaVeiculos.push(veiculo);
      console.log(`✅ ${modelo} adicionado à lista!`);
    }

    continuar = prompt(
      "\nDeseja cadastrar outro veículo? (s/n): ",
    ).toLowerCase();
  } while (continuar === "s");

  // Ordena apenas uma vez ao final de todos os cadastros para ganhar performance
  ordenarPorPreco();
  console.log("\n--- CADASTRO FINALIZADO ---");
};

// 2. Listar Veículos
const listarVeiculos = () => {
  if (listaVeiculos.length === 0) {
    console.log("❌ NENHUM VEÍCULO CADASTRADO.");
    return;
  }

  console.log(
    "\n==================================================================================",
  );
  console.log("--- LISTA DE VEÍCULOS (ORDEM DE PREÇO) ---");
  listaVeiculos.forEach(
    ({ id, modelo, marca, ano, cor, preco }) => {
      console.log(
        `ID: ${id} | Modelo: ${modelo.toUpperCase()} | Marca: ${marca.toUpperCase()} | Ano: ${ano} | Cor: ${cor.toUpperCase()} | Preço: R$ ${preco.toLocaleString(
          "pt-BR",
          {
            minimumFractionDigits: 2,
          },
        )}`,
      );
    },
  );
  console.log(
    "==================================================================================\n",
  );
};

// 3. Filtrar por Marca
const filtrarPorMarca = () => {
  if (listaVeiculos.length === 0) {
    console.log("\nLISTA VAZIA.");
    return;
  }

  const busca = prompt(
    "Digite a marca desejada: ",
  ).toLowerCase();

  const filtrados = listaVeiculos.filter(
    ({ marca }) => marca.toLowerCase() === busca,
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
  filtrados.forEach(({ id, modelo, marca, cor, preco }) => {
    console.log(
      `ID: ${id} | Modelo: ${modelo.toUpperCase()} | Marca: ${marca.toUpperCase()} | Cor: ${cor.toUpperCase()} | Preço: R$ ${preco.toLocaleString(
        "pt-BR",
        {
          minimumFractionDigits: 2,
        },
      )}`,
    );
  });
  console.log(
    "=========================================================================\n",
  );
};

// 4. Atualizar Veículo
const atualizarVeiculo = () => {
  const idVeiculo = parseInt(
    prompt("Digite o ID do veículo para atualizar: "),
  );
  const veiculo = listaVeiculos.find(
    ({ id }) => id === idVeiculo,
  );

  if (!veiculo) {
    console.log("❌ NENHUM VEÍCULO ENCONTRADO.");
    return;
  }

  // Desestrutura apenas para ler e mostrar ao usuário
  const { modelo, marca, cor, preco } = veiculo;

  console.log(`\nEditando: ${modelo} (${marca})`);

  const novaMarca = prompt(
    `Nova marca (atual: ${marca}) [Vazio p/manter]: `,
  );

  const novaCor = prompt(
    `Nova cor (atual: ${cor}) [Vazio p/ manter]: `,
  );
  const novoPreco = prompt(
    `Novo preço (atual: ${preco}) [Vazio p/ manter]: `,
  );

  if (novaMarca) veiculo.marca = novaMarca; // Altera o objeto real
  if (novaCor) veiculo.cor = novaCor;
  if (novoPreco) veiculo.preco = parseFloat(novoPreco); // Altera o objeto real

  ordenarPorPreco();
  console.log("✅ Veículo atualizado!");
};

// 5. Remover Veículo
const removerVeiculo = () => {
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
    console.log("\n ✅ Ação cancelada.");
  }
};

// --- Inicialização Automática do exibirMenu ---
(() => {
  let rodando = true;
  while (rodando) {
    console.log(`
    _________________________________
    |   -=-=- MENU VESTE TECH -=-=- |
    |                               |
    |   1. Cadastrar Veículo        |
    |   2. Listar Veículos          |
    |   3. Filtrar por Marca        |
    |   4. Atualizar (Cor/Preço)    |
    |   5. Remover Veículo          |
    |   6. Sair                     |
    |_______________________________|
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
        console.log("❌ OPÇÃO INVÁLIDA.");
    }
  }
})();
