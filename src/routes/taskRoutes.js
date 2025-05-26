const express = require('express');
const verificarToken = require('../middleware/authMiddleware');
const { criarTarefa, listarTarefas, atualizarTarefa, excluirTarefa } = require('../controllers/taskController');

const router = express.Router();

router.use(verificarToken); // Todas as rotas requerem autenticação
router.post('/', criarTarefa);
router.get('/', listarTarefas);
router.put('/:id', atualizarTarefa);
router.delete('/:id', excluirTarefa);

module.exports = router;