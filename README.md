
# 📋 Todo App – Sistema de Gerenciamento de Tarefas

**Todo App** é uma aplicação web para gerenciar tarefas, permitindo que usuários autenticados criem, editem, excluam e visualizem suas tarefas de forma eficiente. A plataforma é ideal para organização pessoal ou colaborativa, com uma interface responsiva e moderna.

---

## 💡 Sobre o Projeto

O **Todo App** oferece uma solução completa para gerenciamento de tarefas, com autenticação de usuários via JWT, persistência de dados em MySQL e uma interface estilizada com TailwindCSS. O projeto demonstra boas práticas em desenvolvimento web, incluindo modularidade, segurança e responsividade.

---

## 🚀 Tecnologias Utilizadas

- **Back-end**: Node.js, Express, JWT (autenticação), bcrypt (hash de senhas)
- **Front-end**: HTML, TailwindCSS (via CDN), JavaScript puro
- **Banco de Dados**: MySQL
- **Outras Ferramentas**: dotenv (gerenciamento de variáveis de ambiente)
---

## ⚙️ Funcionalidades

- 🔐 Cadastro e login de usuários com autenticação via JWT.
- ➕ Criação de novas tarefas com título, descrição, prioridade e status.
- 📝 Edição de tarefas existentes.
- 🗑️ Exclusão de tarefas.
- 📋 Listagem de tarefas do usuário autenticado.
- 📱 Interface responsiva estilizada com TailwindCSS.

---

## 🛠️ Como Executar Localmente
Pré-requisitos:
- Node.js (v18 ou superior)
- MySQL (v8 ou superior)
- npm

1. **Clone o repositório:**

```bash
git clone https://github.com/joaofsdev/todo_app.git
cd todo_app
```

2. **Instale as dependências do backend:**

```bash
npm install
```

3. **Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=todo_app
PORT=3000
JWT_SECRET=sua_chave_secreta_aqui
```
- Substitua seu_usuario, sua_senha e sua_chave_secreta_aqui pelos valores apropriados.
- Ajuste DB_NAME para o nome do banco de dados que você criou.

4. **Configure o Banco de Dados:**

- Crie um banco de dados MySQL chamado todo_app.
- Execute o script SQL abaixo para criar as tabelas necessárias (salve como sql/init.sql):

```bash
CREATE DATABASE IF NOT EXISTS todo_app;
USE todo_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 📁 Estrutura do Projeto

```
todo_app/
├── public/
│   ├── index.html
│   ├── dashboard.html
│   ├── css/
│   │   └── styles.css  
│   └── js/
│       ├── auth.js  
│       └── tasks.js  
├── sql/    
│   └── banco.sql
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── routes/
│        ├── authRoutes.js
│        └── taskRoutes.js
├── server.js
├── package.json
└── README.md
```

---

## 🌐 Endpoints da API
- **POST /api/auth/registrar**: Cadastra um novo usuário.
    - Corpo: { "username": "string", "password": "string" }
    - Resposta: { "message": "Usuário registrado com sucesso" }

- **POST /api/auth/login**: Autentica um usuário e retorna um token JWT.
    - Corpo: { "username": "string", "password": "string" }
    - Resposta: { "token": "string" }

- **POST /api/tarefas**: Cria uma nova tarefa (requer autenticação).

    - Cabeçalho: Authorization: Bearer <token>
    - Corpo: { "title": "string", "description": "string", "priority": "low|medium|high", "status": "pending|in_progress|completed" }
    - Resposta: { "message": "Tarefa criada com sucesso" }

- **GET /api/tarefas**: Lista as tarefas do usuário autenticado.

    - Cabeçalho: Authorization: Bearer <token>
    - Resposta: [{ "id": number, "title": "string", "description": "string", "priority": "string", "status": "string" }]

- **PUT /api/tarefas/:id**: Atualiza uma tarefa (requer autenticação).

    - Cabeçalho: Authorization: Bearer <token>
    - Corpo: { "title": "string", "description": "string", "priority": "low|medium|high", "status": "pending|in_progress|completed" }
    - Resposta: { "message": "Tarefa atualizada com sucesso" }

- **DELETE /api/tarefas/:id**: Exclui uma tarefa (requer autenticação).

    - Cabeçalho: Authorization: Bearer <token>
    - Resposta: { "message": "Tarefa excluída com sucesso" }

---
## 📌 Observações Importantes

- Autenticação: Todas as rotas de tarefas requerem um token JWT no cabeçalho Authorization.
- TailwindCSS: Utilizado via CDN no front-end para estilização. Caso prefira compilação local, configure um processo de build com tailwindcss-cli.
- Erros: Mensagens de erro são retornadas em formato JSON para facilitar a depuração (ex.: { "error": "Token inválido" }).
- Depuração: Adicione logs no server.js ou nos controladores para diagnosticar problemas, como falhas na conexão com o banco de dados.

---

## 🔮 Possíveis Expansões Futuras

- ✅ Adição de validação de formulários no front-end com JavaScript.
- 🔍 Filtros para tarefas (ex.: por status ou prioridade).
- 🧪 Testes unitários com Jest para back-end e front-end.
- 🎨 Melhorias na interface com animações e modais usando TailwindCSS.
- 📊 Integração de gráficos para estatísticas de tarefas (ex.: tarefas concluídas por período).

---

## 🧠 Autor

Desenvolvido por **Joao Francisco da Silva**, estudante de Engenharia de Software, com foco em soluções acessíveis e funcionais para o dia a dia.
