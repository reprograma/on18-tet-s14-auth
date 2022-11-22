const express = require("express");
const router = express.Router();

const controller = require("../controllers/bibliotecaController");

const { checkAuth } = require('../middlewares/auth')

router.post("/criar", controller.criarBiblioteca);
router.get("/buscar", controller.buscarBibliotecas);
router.get("/buscar/:id", controller.buscarBibliotecaPorId);
router.delete("/deletar/:id", checkAuth, controller.deletarBiblioteca);
router.patch("/atualizar/:id", checkAuth, controller.atualizarBiblioteca); // VERIFICAR ERRO 

module.exports = router;