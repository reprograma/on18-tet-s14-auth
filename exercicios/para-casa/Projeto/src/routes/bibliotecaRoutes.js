const express = require('express')
const router = express.Router()

const controller = require('../controllers/bibliotecaController')


//Rotas do Sistema
router.post('/biblioteca',controller.criarBiblioteca)
router.get('/biblioteca', controller.buscarBiblioteca)
router.delete('/biblioteca/:id',controller.deletarBiblioteca)
router.get('/biblioteca/:id',controller.buscarBibliotecaPorId)
router.patch('/biblioteca/:id',controller.atualizarBiblioteca)










module.exports = router
