-- Criando o banco de dados
CREATE DATABASE IF NOT EXISTS todo_app;
USE todo_app;

-- Tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de tarefas (atualizada)
CREATE TABLE tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    prioridade ENUM('baixa', 'media', 'alta') DEFAULT 'media',
    status ENUM('nao_comecada', 'em_andamento', 'concluida') DEFAULT 'nao_comecada',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Inserindo dados iniciais (usuário de teste)
INSERT INTO usuarios (nome, email, senha) VALUES 
('Usuário Teste', 'teste@exemplo.com', '$2b$10$8xY8s8e8x8e8x8e8x8e8x8e8x8e8x8e8x8'); -- Senha: "teste123" (hash gerado com bcrypt)