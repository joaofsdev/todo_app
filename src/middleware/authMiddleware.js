const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ mensagem: 'Token inválido', erro: error.message });
    }
};

module.exports = verificarToken;