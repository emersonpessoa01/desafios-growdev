## 🚀 Desafios Growdev: Lógica e CRUD com JavaScript

Este repositório contém as soluções desenvolvidas para os desafios técnicos propostos pela Growdev, focando em lógica de programação, manipulação de arrays e estruturação de aplicações modernas em Node.js (ESM).

---

### 🏦 1. Sistema de Caixa Eletrônico (src/grow.js)

#### Contextualização
Desenvolvimento do algoritmo de saque para caixas eletrônicos das Ilhas Growdev (Moeda Oficial: **GrowCoin GC$**). O objetivo é garantir a entrega do menor número de cédulas possível, priorizando as de maior valor.

#### Funcionalidades
* **Cédulas Disponíveis:** GC$ 50,00, GC$ 10,00, GC$ 5,00 e GC$ 1,00.
* **Lógica:** Implementação utilizando divisão inteira (`Math.floor`) e operador de resto (`%`) para otimização do saque.
* **Validação:** Verificação de entradas inválidas ou valores negativos.

---

### 🏎️ 2. CRUD de Veículos (src/crud.js)

### Contextualização
Sistema interativo para gerenciamento de frotas (Growdev) com operações completas de Create, Read, Update e Delete via terminal.

#### Diferenciais Técnicos
* **Modern JavaScript:** Uso extensivo de *Arrow Functions* e *Destructuring* de objetos.
* **Persistência por Referência:** Atualização segura de propriedades de objetos diretamente no array original.
* **Regra de Negócio:** A lista de veículos é mantida permanentemente ordenada por **preço** (ordem crescente).
* **Filtros:** Busca inteligente por marca com exibição formatada.

---

### 🛠️ Tecnologias e Configurações

O projeto foi estruturado utilizando **Node.js** com suporte a módulos (ESM).

#### Dependências
* `prompt-sync (^4.2.0)`: Para captura de dados via terminal.

#### Ferramentas de Desenvolvimento (Linting & Style)
O código é padronizado utilizando o **Prettier** com as seguintes regras definidas no `.prettierrc`:
* **Plugins:** `prettier-plugin-jsdoc` para documentação profissional.
* **Print Width:** 60 (otimizado para leitura).
* **Quotes:** Double quotes (aspas duplas).
* **Trailing Comma:** All (vírgulas finais em tudo).

---

### 📋 Como Executar

Certifique-se de ter o Node.js instalado em sua máquina e execute os comandos abaixo:

```bash
# 1. Instalar as dependências
npm install

# 2. Executar o Saque de GrowCoins
npm run grow

# 3. Executar o Gerenciamento de Veículos
npm run crud
```

### 📂 Estrutura do Projeto

```text

├── src/              # Código fonte (Lógica Node.js)
│   ├── crud.js       # Sistema de gerenciamento de veículos
│   └── grow.js       # Algoritmo de saque de GrowCoins
├── .gitignore        # Arquivos ignorados pelo Git
├── .prettierrc       # Configurações de formatação
├── package.json      # Dependências e scripts do projeto
└── README.md         # Documentação do projeto

```

- Instrutora: @leticialeal

✒️ Desenvolvido por Emerson Pessoa <br>
[Linkedin](https://www.linkedin.com/in/emersonpessoa01/) — Desenvolvedor em constante evolução 🚀