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
let prompt = PromptSync();

let listaVeiculos = [];
let proximoId = 1; // Variável para gerar IDs únicos

// --- Funções Auxiliares ---

/* Função para ordenar listar por preço (Regra: A lista deve estar semmpre ordendada por preço) */
function ordenarPorPreco() {
  listaVeiculos.sort((a, b) => a.preco - b.preco);
}

//-- Funcionalidade de CRUD ---

//1.Criar um Veículo
function criarVeiculo() {
  let modelo, marca, ano, cor, preco;
  modelo = prompt("Digite o modelo do veículo: ");
  marca = prompt("Digite a marca do veículo: ");
  ano = parseInt(prompt("Digite o ano do veículo: "));
  cor = prompt("Digite a cor do veículo: ");
  preco = parseFloat(prompt("Digite o preço do veículo: "));

  // Validação básica dos dados
  if (
    !modelo ||
    !marca ||
    isNaN(ano) ||
    !cor ||
    isNaN(preco)
  ) {
    console.log(
      "Dados inválidos. Por favor, tente novamente.",
    );
    return;
  }

  const novoVeiculo = {
    id: proximoId++,
    modelo,
    marca,
    ano,
    cor,
    preco,
  };

  listaVeiculos.push(novoVeiculo);
  ordenarPorPreco();
}
criarVeiculo();

//2. Listar tosdos os Veículos
function listarVeiculos() {
  if (listaVeiculos.length === 0) {
    console.log("Nenhum veículo cadastrado.");
    return;
  }
  console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
  console.log(
    "\n--- LISTA DE VEÍCULOS (ORDENADA POR PREÇO)---",
  );
  listaVeiculos.forEach(
    ({ id, modelo, marca, ano, cor, preco }) => {
      console.log(
        `ID: ${id} | Modelo: ${modelo} | Marca: ${marca} | Ano: ${ano} | Cor: ${cor} | Preço: R$ ${preco.toLocaleString(
          "pt-BR",
          {
            minimumFractionDigits: 2,
          },
        )}`,
      );
    },
  );
}

listarVeiculos();

//3. Filtrar por Marca
function filtrarPorMarca() {
  const marcaBusca = prompt(
    "Informe a marca para filtrar: ",
  ).toLowerCase();
  const filtrados = listaVeiculos.filter(
    (veiculo) => veiculo.marca.toLowerCase() === marcaBusca,
  );

  if (filtrados.length === 0) {
    console.log("Nenhum veículo desta marca encontrado.");
    return;
  }
  console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
  console.log(
    `\n--- FILTRO: MARCA ${marcaBusca.toUpperCase()} ---`,
  );
  filtrados.forEach((filtrado) =>
    console.log(
      `ID: ${filtrado.id} | Modelo: ${filtrado.modelo} | Cor: ${filtrado.cor} | Preço: R$ ${filtrado.preco.toLocaleString(
        "pt-BR",
        {
          minimumFractionDigits: 2,
        },
      )}`,
    ),
  );
}
filtrarPorMarca();

//4. Atualizar Veículo
function atualizarVeiculo() {
  const idBusca = parseInt(
    prompt("Digite o ID veículo que deseja atualizar: "),
  );
  const veiculo = listaVeiculos.find(
    (veiculo) => veiculo.id === idBusca,
  );
  //Verifica caso não exista
  if (!veiculo) {
    console.log("Veículo não encontrado");
  }

  const novaCor = prompt(
    `Cor atual: ${veiculo.cor}. Digite a nova cor (ou deixe em branco para manter): `,
  );
  const novoPreco = prompt(
    `Preço atual: ${veiculo.preco}. Digite o novo preço (ou deixe em branco para manter): `,
  );

  if (novaCor) veiculo.cor = novaCor;
  if (novoPreco) veiculo.preco = parseFloat(novoPreco);

  ordenarPorPreco(); // Reordenar caso o preço tenha mudado
  console.log("Veículo atualizado com sucesso!");
  console.log(
    `O veículo ${veiculo.modelo} teve sua cor mudada para ${veiculo.cor} e seu preço para ${veiculo.preco.toLocaleString(
      "pt-BR",
      {
        minimumFractionDigits: 2,
      },
    )}`,
  );
}

atualizarVeiculo();

//5. Remover Veículo
function removerVeiculo() {
  const idBusca = parseInt(
    prompt("Digite o ID do veículo que deseja remover: "),
  );
  const index = listaVeiculos.findIndex(
    (veiculo) => veiculo.id === idBusca,
  );
  if (index === -1) {
    console.log("Veículo não encontrado.");
    return;
  }
  const confirmacao = prompt(
    `Tem certeza que deseja remover o ${listaVeiculos[index].modelo}? (s/n): `,
  ).toLowerCase();

  if (confirmacao === "s") {
    listaVeiculos.splice(index, 1);
    console.log(`Veículo ${veiculo.marca} removido com sucesso!`);
  } else {
    console.log("Operação cancelada");
  }
}
removerVeiculo();
