const express = require("express");
const router = express.Router();

// depois voltamos para a fase das rotas
const controller = require("../controllers/userController");
const authController = require("../controllers/authController");
const cozinhaController = require("../controllers/cozinhaController")

const { checkAuth } = require("../middlewares/auth");

router.get("/all", checkAuth, controller.getAll);
router.post("/create", controller.createUser);
router.post("/login", authController.login);
router.get("/cozinha",cozinhaController.buscarTodasCozinhas)

// router.get("/cozinha/:id", cozinhaController.buscarCozinhaId)
// router.post("/cozinha", cozinhaController.criarCozinha) 
// router.delete("/cozinha/:id", cozinhaController.deletarCozinha)
// router.patch("/cozinha/:id", cozinhaController.atualizarCozinha)


module.exports = router;
