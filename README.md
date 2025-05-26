Sistema de Gerenciamento de Tarefas
Um aplicativo web para gerenciar tarefas, com autenticação de usuários, construído com Node.js, Express, MySQL e TailwindCSS.
Tecnologias Utilizadas

Back-end: Node.js, Express, JWT, bcrypt
Front-end: HTML, TailwindCSS, JavaScript puro
Banco de Dados: MySQL

Configuração do Ambiente

Pré-requisitos:

Node.js (v18 ou superior)
MySQL (v8 ou superior)
npm


Instalação:
git clone <URL_DO_REPOSITORIO>
cd todo-app
npm install


Configuração do Banco de Dados:

Crie um banco de dados MySQL chamado todo_app.
Execute o script sql/init.sql para criar as tabelas e inserir dados iniciais.
Configure as variáveis de ambiente no arquivo .env:DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=todo_app
PORT=3000
JWT_SECRET=sua_chave_secreta_aqui




Executando o Projeto:
npm start


Acesse o aplicativo em http://localhost:3000.



Endpoints da API

POST /api/auth/registrar: Cadastra um novo usuário.
POST /api/auth/login: Autentica um usuário e retorna um token JWT.
POST /api/tarefas: Cria uma nova tarefa (requer autenticação).
GET /api/tarefas: Lista as tarefas do usuário autenticado.
PUT /api/tarefas/:id: Atualiza uma tarefa (requer autenticação).
DELETE /api/tarefas/:id: Exclui uma tarefa (requer autenticação).

Estrutura do Projeto

/public: Arquivos estáticos (HTML, CSS, JS).
/src: Lógica do back-end (config, controllers, routes, middleware).
/sql: Scripts SQL para configuração do banco.

Como Usar

Acesse a página inicial (/index.html) para fazer login ou cadastro.
Após login, você será redirecionado ao painel de tarefas (/dashboard.html).
Crie, edite ou exclua tarefas no painel.

Próximos Passos

Adicionar validação de formulários no front-end.
Implementar filtros para tarefas (ex.: por status).
Adicionar testes unitários com Jest.
Melhorar a interface com animações e modais.

