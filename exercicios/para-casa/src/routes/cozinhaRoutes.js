const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const cozinhaController = require("../controllers/cozinhaController")

const { checkAuth } = require("../middlewares/auth");

router.get("/listar", cozinhaController.listarTodos);
router.post("/criarusuario", cozinhaController.cadastrarUsuario);
router.post("/login", authController.login);
router.get("/buscartodas",cozinhaController.buscarTodasCozinhas);
router.post("/criar", cozinhaController.criarCozinha);
router.get("/buscarporid/:id", cozinhaController.buscarCozinhaId)
router.delete("/deletar/:id", checkAuth, cozinhaController.deletarCozinha)
router.patch("/atualizar/:id", checkAuth, cozinhaController.atualizarCozinha)


module.exports = router;