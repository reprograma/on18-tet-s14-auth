const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const cozinhaController = require("../controllers/cozinhaController")

const { checkAuth } = require("../middlewares/auth");

router.get("/users/all", checkAuth, cozinhaController.getAll);
router.post("/users/create", cozinhaController.criarUsuario);
router.post("/users/login", authController.login);
router.get("/", cozinhaController.buscarTodasCozinhas);
router.post("/", cozinhaController.criarCozinha);
router.get("/:id", cozinhaController.buscarCozinhaId)
router.delete("/:id", checkAuth, cozinhaController.deletarCozinha)
router.patch("/:id", checkAuth, cozinhaController.atualizarCozinha)

module.exports = router;