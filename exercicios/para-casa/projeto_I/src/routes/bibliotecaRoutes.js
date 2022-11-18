const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const bibliotecaController = require("../controllers/bibliotecaController")

const { checkAuth } = require("../middlewares/auth");

router.get("/todosusuarios", checkAuth, bibliotecaController.getAll);
router.post("/criarusuario", bibliotecaController.criarUsuario);
router.post("/login", authController.login);
router.get("/buscartodas",bibliotecaController.buscarTodasBibliotecas);
router.post("/criarcozinha", bibliotecaController.criarBiblioteca);
router.get("/buscarporid/:id", bibliotecaController.buscarBibliotecaId);
router.delete("/deletar/:id", checkAuth, bibliotecaController.deletarBibliotexa);
router.patch("/atualizar/:id", checkAuth, bibliotecaController.atualizarBiblioteca)

module.exports = router;