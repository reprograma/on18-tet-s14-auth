const express = require("express")
const router = express.Router();

const cozinhaController = require("../controllers/cozinhaController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const { checkAuth } = require("../middlewares/auth");

router.post("/usuarios/criar", userController.criarUsuario);

router.post("/usuarios/login", authController.login);

router.get("/buscar", cozinhaController.buscarTodasCozinhas);
router.get("/buscar/:id", cozinhaController.buscarCozinhaPorId);
router.post("/cadastrar", checkAuth, cozinhaController.cadastrarCozinha);
router.delete("/deletar/:id", checkAuth, cozinhaController.deletarCozinha);
router.patch("/atualizar/:id", checkAuth, cozinhaController.atualizarCozinha);


module.exports = router;



