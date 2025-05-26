const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const registrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Nome, email e senha são obrigatórios' });
    }

    try {
        const [existingUser] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ mensagem: 'Email já registrado' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashedPassword]);

        res.status(201).json({ mensagem: 'Usuário registrado com sucesso' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao registrar usuário', erro: error.message });
    }
};

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Email e senha são obrigatórios' });
    }

    try {
        const [users] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, usuario: { id: user.id, nome: user.nome, email: user.email } });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao fazer login', erro: error.message });
    }
};

module.exports = { registrarUsuario, loginUsuario };