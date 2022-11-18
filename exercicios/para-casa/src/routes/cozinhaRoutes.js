const express = require("express")
const router = express.Router()

const controller = require("../controllers/cozinhaController")
const { checkAuth } = require("../middlewares/auth")
const authController = require("../controllers/authController")

router.get("/buscar", checkAuth, controller.catalogoDeCozinhas)
router.post("/cadastrar", controller.criarCozinha)
router.post("/login", authController.login)
router.patch("/atualizar/:id", checkAuth, controller.atualizarCozinha)
router.delete("/deletar/:id", checkAuth, controller.deletarCozinha)

module.exports = router