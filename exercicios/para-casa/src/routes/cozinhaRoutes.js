const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const cozinhaController = require("../controllers/cozinhaController")

const { checkAuth } = require("../middlewares/auth");

router.get("/todosusuarios", checkAuth, cozinhaController.getAll);
router.post("/criarusuario", cozinhaController.criarUsuario);
router.post("/login", authController.login);
router.get("/buscartodas",cozinhaController.buscarTodasCozinhas);
router.post("/criarcozinha", cozinhaController.criarCozinha);
router.get("/buscarporid/:id", cozinhaController.buscarCozinhaId)
router.delete("/deletar/:id", cozinhaController.deletarCozinha)
router.patch("/atualizar/:id", cozinhaController.atualizarCozinha)

module.exports = router;