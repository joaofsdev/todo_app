const pool = require('../config/db');

const criarTarefa = async (req, res) => {
    const { titulo, descricao, prioridade, status } = req.body;
    const usuario_id = req.user.id;

    if (!titulo || !prioridade || !status) {
        return res.status(400).json({ mensagem: 'Título, prioridade e status são obrigatórios' });
    }

    try {
        await pool.query(
            'INSERT INTO tarefas (usuario_id, titulo, descricao, prioridade, status) VALUES (?, ?, ?, ?, ?)',
            [usuario_id, titulo, descricao || '', prioridade, status]
        );
        res.status(201).json({ mensagem: 'Tarefa criada com sucesso' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar tarefa', erro: error.message });
    }
};

const listarTarefas = async (req, res) => {
    const usuario_id = req.user.id;

    try {
        const [tarefas] = await pool.query('SELECT * FROM tarefas WHERE usuario_id = ?', [usuario_id]);
        res.json(tarefas);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao listar tarefas', erro: error.message });
    }
};

const atualizarTarefa = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, prioridade, status } = req.body;
    const usuario_id = req.user.id;

    if (!titulo || !prioridade || !status) {
        return res.status(400).json({ mensagem: 'Título, prioridade e status são obrigatórios' });
    }

    try {
        const [result] = await pool.query(
            'UPDATE tarefas SET titulo = ?, descricao = ?, prioridade = ?, status = ? WHERE id = ? AND usuario_id = ?',
            [titulo, descricao || '', prioridade, status, id, usuario_id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Tarefa não encontrada ou não pertence ao usuário' });
        }
        res.json({ mensagem: 'Tarefa atualizada com sucesso' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar tarefa', erro: error.message });
    }
};

const excluirTarefa = async (req, res) => {
    const { id } = req.params;
    const usuario_id = req.user.id;

    try {
        const [result] = await pool.query('DELETE FROM tarefas WHERE id = ? AND usuario_id = ?', [id, usuario_id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Tarefa não encontrada ou não pertence ao usuário' });
        }
        res.json({ mensagem: 'Tarefa excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao excluir tarefa', erro: error.message });
    }
};

module.exports = { criarTarefa, listarTarefas, atualizarTarefa, excluirTarefa };