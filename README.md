
# Tecnologias utilizadas

 - [React](https://reactjs.org/)
 - [Axios](https://github.com/axios/axios)
 - [SweetAlert2](https://sweetalert2.github.io/)

# Funcionalidades da aplicação

 - CRUD de produtos
 - Filtro dos produtos pela sua descrição

# Como executar este projeto

Para executar a aplicação será necessário seguir os passos abaixo:

 - Após da aplicação ser baixada, dentro do diretorio será necessário executar o comando "npm install" para baixar as dependencias do projeto
 - Para executar em ambiente local utilizar o comando "npm start"

# Fluxo da aplicação

A seguir será mostrado a seguencia de passos para utilizar a aplicação.

## Produtos

### Criando novos produtos

 - Preencha o formulário com seus respectivos dados
 - Pressione o Botão salvar
 - O sistema irá abrir um modal com a mensagem "Inserido com sucesso" e atualizará a lista de produtos
 - Clique em OK ou clique fora do modal para fecha-lo
 
### Ver produto

 - Na listagem dos produtos, clicar na opção "Ver" do produto desejado
 - O sistema irá carregar as informações do produto selecionado nos campos do formulário
 - Para sair da visualização clicar no botão "Criar novo produto"

### Editar produto

 - Na listagem dos produtos, clicar na opção "Editar" do produto desejado
 - O sistema irá carregar as informações do produto selecionado nos campos do formulário
 - Edite que o desejar e clique no botão "Editar"
 - O sistema irá abrir um modal com a mensagem "Editado com sucesso" e atualizará a lista de produtos
 - Clique em OK ou clique fora do modal para fecha-lo

### Remover produto

 - Na listagem dos produtos, clicar na opção "Remover" do produto desejado
 - O sistema abrirá um modal com a mensagem "Você tem certeza que deseja remover este produto?"
 - Clique no botão "Deletar!" para remover o produto
 - Caso não quiser remover o produto, clique no botão "Cancelar"
 - O sistema irá carregar a listagem de produtos

### Alterar status do produto

 - Na listagem dos produtos, será mostrado o atual status do produto
 - Para alterar o status, o usuário deve apenas clicar no status
 - O sistema irá atualizar a listagem com o novo status do produto

### Buscar produto

 - Na listagem dos produtos, preencher o campo "Buscar por descrição"
 - O sistema irá atualizar a listagem dos produtos por cada caracter digitado
