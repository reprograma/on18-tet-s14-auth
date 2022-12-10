const express = require('express')
const router = express.Router()

const controller = require('../controllers/bibliotecaController')



const authController = require("../controllers/authController")

const {checkAuth}=require("../middlewares/auth");

//Rotas do Sistema
router.post('/biblioteca',checkAuth,controller.criarBiblioteca)
router.get('/biblioteca', controller.buscarBiblioteca)
router.get('/biblioteca/:id',controller.buscarBibliotecaPorId)
router.patch('/biblioteca/:id',checkAuth,controller.atualizarBiblioteca)
router.delete('/biblioteca/:id',checkAuth,controller.deletarBiblioteca)//tudo ok



module.exports = router