const express = require('express');
const router = express.Router();

const controller = require('../controllers/bibliotecaController');
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const { checkAuth } = require("../middlewares/auth");

router.post("/criar", controller.criarBiblioteca);
router.get("/buscar/:id", controller.buscarBibliotecasPorID);
router.get("/listar", controller.listarBibliotecas);
router.patch("/atualizar/:id", checkAuth, controller.atualizarBiblioteca);
router.delete("/remover/:id", checkAuth, controller.removerBiblioteca);
router.post("/criar_usuario/", userController.createUser);
router.post("/listar_usuarios/", checkAuth, userController.getAll);
router.post("/login/", authController.login);



module.exports = router;