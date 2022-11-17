const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');
const authController = require("../controllers/authController");

const { checkAuth } = require("../middlewares/auth");

router.get("/all", checkAuth, controller.getAll);
router.post("/create", controller.createUser);
router.post("/login", authController.login);

router.get("/buscar", controller.buscarBibliotecas);
router.get("/buscar/:id", controller.obterBibliotecaPorId);
router.post("/criar", controller.criarBiblioteca);
router.patch("/atualizar/:id", checkAuth, controller.atualizarBiblioteca);
router.delete("/deletar/:id", checkAuth, controller.deletarBiblioteca);

module.exports = router;