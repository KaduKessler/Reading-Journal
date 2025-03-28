# Reading Journal 📚

Este é um projeto desenvolvido para a **Fase 2** da disciplina de **Desenvolvimento de Sistemas Frontend** do curso de Análise e Desenvolvimento de Sistemas da PUCRS.  
O objetivo foi criar um CRUD completo (Create, Read, Update, Delete) para um inventário de livros lidos, integrando com uma API REST fornecida pela instituição.

## 👤 Aluno

Carlos Eduardo B. Kessler  
Curso: Análise e Desenvolvimento de Sistemas – PUCRS Online

## 🔧 Tecnologias utilizadas

- React
- Vite
- React Router DOM
- Axios
- JavaScript (ES6+)
- CSS com suporte a tema escuro/claro adaptado ao sistema

## 🚀 Como executar o projeto

1. Clone este repositório ou extraia o `.zip` enviado.
2. No terminal, navegue até a pasta do projeto e instale as dependências:

   ```bash
   npm install
   ```

3. Execute a API fornecida pela disciplina:

   - Clone o repositório da API:  
     [https://github.com/adsPucrsOnline/DesenvolvimentoFrontend](https://github.com/adsPucrsOnline/DesenvolvimentoFrontend)

   - Navegue até a pasta da API:

   ```bash
   cd ./DesenvolvimentoFrontend/readingJournal-api/
   ```

   - Instale as dependências da API:

   ```bash
   npm install
   ```

   - Inicie a API:

   ```bash
   npm start
   ```

   - A API estará disponível em:  
     <http://localhost:5000>

4. Volte para a pasta do projeto React e inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Acesse a aplicação no navegador:  
   <http://localhost:5173>

## 🧩 Funcionalidades implementadas

- **Listagem de livros (GET)**  
  Exibe todos os livros cadastrados na API com opção de editar ou excluir.

- **Cadastro de novo livro (POST)**  
  Formulário com validação para adicionar um novo livro à API.

- **Edição de livro (PUT)**  
  Ao clicar em "Editar", o formulário é preenchido com os dados do livro e permite atualizar.

- **Exclusão de livro (DELETE)**  
  Remove o livro da lista e da base da API.

- **Feedback visual**  
  Mensagens de sucesso e exibição do último livro cadastrado/atualizado.

## 📦 Componentes principais

### BookForm

Formulário reutilizável para cadastro e edição.  
Possui validações, foco automático e integrações com a API.

### BookList

Renderiza dinamicamente os livros obtidos via API.  
Cada item contém botões de "Editar" e "Excluir".

### BookListPage

Página principal da listagem.  
Faz a requisição GET, exibe os livros e permite deletar.

### AddBook

Página que reutiliza o BookForm para cadastrar e atualizar livros via POST e PUT.

### NavBar

Barra de navegação com links para as páginas: Home, Cadastro, Lista e Sobre.

## ✅ Observações

- Os dados são consumidos dinamicamente da API com Axios.
- Todas as operações estão integradas: GET, POST, PUT e DELETE.
- Datas são formatadas no padrão brasileiro (DD/MM/AAAA).
- Estilização com suporte a tema claro/escuro via `prefers-color-scheme`.
- Projeto segue as instruções propostas pela disciplina e validações básicas de formulários.

## 🖼️ Prints da aplicação

### Página Inicial

![Home](./src/assets/home.png)

### Página de Cadastro

![Cadastro](./src/assets/cadastro.png)

### Página de Lista de Livros

![Lista](./src/assets/lista.png)
