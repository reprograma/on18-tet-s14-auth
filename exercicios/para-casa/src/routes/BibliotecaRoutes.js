const express = require('express');
const bibliotecaController = require("../controllers/BibliotecaController")
const authController = require("../controllers/AuthController")
const { checkAuth } = require("../middlewares/auth");
const router = express.Router();

router.get("/biblioteca", checkAuth, bibliotecaController.buscarBibliotecas)

router.get("/biblioteca/:id", checkAuth, bibliotecaController.buscarBibliotecaPorId)

router.post("/biblioteca", checkAuth, bibliotecaController.criarBiblioteca)

router.delete("/biblioteca", checkAuth, bibliotecaController.deletarBiblioteca)

router.post("/users", bibliotecaController.criarUsuario)

router.post("/login", authController.login)

module.exports = router;