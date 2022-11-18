const express = require('express');
const router = express.Router();

const controller = require('../controllers/cozinhaControllers');

router.post('/criar', controller.criarCozinha);
router.get('/buscar', controller.buscarTodasCozinhas);
router.delete('/:id', controller.deletarCozinha)


module.exports = router;