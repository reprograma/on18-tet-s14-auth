const express = require('express');
const router = express.Router();

const authController = require("../controllers/authController")

const controller = require('../controllers/cozinhaController');

const {checkAuth} = require("../middlewares/auth");

router.get("/todosusuarios", checkAuth, cozinhaController.getAll);
router.post("/criarusuario", cozinhaController.criarUsuario);
router.post("/login", authController.login);
router.post('/criar', controller.criarCozinha);
router.get('/buscar', controller.buscarTodasCozinhas);
router.delete('/:id', controller.deletarCozinha);
router.patch("/:id", controller.atualizarCozinha);


module.exports = router;