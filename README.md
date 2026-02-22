# SIte-Lady_luna

Este projeto é um sistema de controle de materiais e financeiro desenvolvido como trabalho acadêmico. Ele consiste em uma aplicação web frontend estática e uma API RESTful backend para gerenciamento de dados de estoque, materiais e receitas.

## Funcionalidades

-   **Controle de Estoque**: Gerenciamento de itens em estoque, incluindo quantidade, valor unitário, data de validade e fornecedor.
-   **Gerenciamento de Materiais**: Cadastro e consulta de materiais.
-   **Gerenciamento de Receitas**: Cadastro e consulta de receitas.
-   **Dashboard**: Visão geral e acompanhamento de métricas.
-   **Módulos Financeiro e Perfil**: Telas para funcionalidades financeiras e de perfil de usuário (implementação pode variar).

## Tecnologias Utilizadas

### Frontend

-   **HTML5**
-   **CSS3**
-   **JavaScript**

### Backend

-   **Node.js**
-   **Express.js**: Framework web para Node.js.
-   **MySQL2**: Driver para conexão com banco de dados MySQL.
-   **CORS**: Middleware para habilitar Cross-Origin Resource Sharing.

### Banco de Dados

-   **MySQL**

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

-   [Node.js](https://nodejs.org/en/download/) (versão 14 ou superior)
-   [npm](https://www.npmjs.com/get-npm) (gerenciador de pacotes do Node.js, geralmente vem com o Node.js)
-   [MySQL Server](https://dev.mysql.com/downloads/mysql/) (versão 8.0 ou superior)
-   Um cliente MySQL (como [MySQL Workbench](https://www.mysql.com/products/workbench/) ou linha de comando)

## Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### 1. Clonar o Repositório

Abra seu terminal ou prompt de comando e execute o seguinte comando para clonar o repositório:

```bash
git clone https://github.com/RaphaLsantos/SIte-Lady_luna.git
cd SIte-Lady_luna
```

### 2. Configuração do Banco de Dados MySQL

O projeto utiliza um banco de dados MySQL. Você precisará criar um banco de dados e as tabelas necessárias.

#### 2.1. Criar o Banco de Dados

Abra seu cliente MySQL e execute o seguinte comando para criar o banco de dados `lady_luna`:

```sql
CREATE DATABASE lady_luna;
USE lady_luna;
```

#### 2.2. Criar as Tabelas

Com base na estrutura da API, as seguintes tabelas são esperadas. Execute os comandos SQL abaixo para criá-las. Note que estas são estruturas básicas e podem precisar de ajustes finos dependendo da lógica de negócio completa.

**Tabela `estoque`:**

```sql
CREATE TABLE estoque (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    nome_item VARCHAR(255) NOT NULL,
    categoria VARCHAR(100),
    quantidade DECIMAL(10, 2) NOT NULL,
    unidade_medida VARCHAR(50),
    valor_unitario DECIMAL(10, 2),
    data_validade DATE,
    fornecedor VARCHAR(255),
    local_armazenamento VARCHAR(255),
    minimo_estoque DECIMAL(10, 2),
    ativo BOOLEAN DEFAULT TRUE,
    observacoes TEXT
);
```

**Tabela `materiais`:**

```sql
CREATE TABLE materiais (
    id_material INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT
);
```

**Tabela `receitas`:**

```sql
CREATE TABLE receitas (
    id_receita INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT
);
```

**Tabela `receita_ingredientes` (assumindo uma relação entre receitas e estoque):**

```sql
CREATE TABLE receita_ingredientes (
    id_receita_ingrediente INT AUTO_INCREMENT PRIMARY KEY,
    id_receita INT NOT NULL,
    id_item INT NOT NULL,
    quantidade DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_receita) REFERENCES receitas(id_receita) ON DELETE CASCADE,
    FOREIGN KEY (id_item) REFERENCES estoque(id_item) ON DELETE CASCADE
);
```

**Tabela `usuarios` (assumindo um sistema de login/cadastro):**

```sql
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);
```

#### 2.3. Configurar Credenciais do Banco de Dados

O backend está configurado para se conectar ao MySQL usando as seguintes credenciais (definidas em `API-REST/src/app/database/conexao.js`):

-   **Host**: `localhost`
-   **Porta**: `3306`
-   **Usuário**: `root`
-   **Senha**: `Bankai@6579`
-   **Banco de Dados**: `lady_luna`

Se suas credenciais MySQL forem diferentes, você precisará editar o arquivo `API-REST/src/app/database/conexao.js` para refletir suas configurações locais.

### 3. Configuração e Execução do Backend (API REST)

Navegue até o diretório da API e instale as dependências:

```bash
cd API-REST
npm install
```

Após a instalação, inicie o servidor backend:

```bash
npm run dev
```

O servidor da API será iniciado em `http://localhost:8081`.

### 4. Execução do Frontend

O frontend é uma aplicação estática. Para executá-la, basta abrir o arquivo `index.html` em seu navegador web preferido.

```bash
cd .. # Volte para a raiz do projeto se estiver no diretório API-REST
start index.html # No Windows
open index.html # No macOS
x-www-browser index.html # No Linux (pode variar dependendo da sua distribuição)
```

Alternativamente, você pode usar uma extensão de servidor local para VS Code (como `Live Server`) ou qualquer outro servidor HTTP estático para servir os arquivos do frontend. Isso é recomendado para evitar problemas de CORS em alguns navegadores.

## Uso da Aplicação

Com o backend rodando e o frontend aberto no navegador, você poderá interagir com o sistema. Navegue pelas diferentes telas (Dashboard, Estoque, Materiais, Receitas, Financeiro, Perfil) para explorar as funcionalidades.

## Contribuição

Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novas funcionalidades. Faça um fork do repositório, crie uma nova branch e envie um pull request.

## Licença

Este projeto está licenciado sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autor

Lucas Matos Dias (conforme `package.json` do backend)

---

**Manus AI**
Fevereiro de 2026
