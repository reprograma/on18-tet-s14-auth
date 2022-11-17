const express = require("express");
const router = express.Router();

// depois voltamos para a fase das rotas
// const controller = require("../controllers/userController");
const authController = require("../controllers/authController");
const cozinhaController = require("../controllers/cozinhaController")

const { checkAuth } = require("../middlewares/auth");

router.get("/todas", checkAuth, cozinhaController.getAll); //buscar todas as cozinhas OK!
router.post("/create", cozinhaController.criarUsuario); // criar um novo usuario OK!
router.post("/login", authController.login); //criar login OK!
router.get("/all",cozinhaController.buscarTodasCozinhas);
router.post("/criarcozinha", cozinhaController.criarCozinha); //OK
router.get("/buscarid/:id", cozinhaController.buscarCozinhaId); // OK
router.delete("/:id", checkAuth, cozinhaController.deletarCozinha)
router.patch("/:id", checkAuth, cozinhaController.atualizarCozinha)




module.exports = router;