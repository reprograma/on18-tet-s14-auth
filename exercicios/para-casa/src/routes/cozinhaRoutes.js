const express = require("express")
const router = express.Router()

const controller = require("../controllers/cozinhaController")
const authController = require("../controllers/authController")
const { checkAuth } = require("../middlewares/auth");

router.post("/criar", checkAuth, controller.criarCozinha)
router.get("/buscar", controller.buscarCozinhas)
router.post("/login", authController.login)


router.patch("/atualizar/:id", controller.atualizarCozinha)
router.get("/buscar/:id", controller.encontrarCozinha)
router.delete("/deletar/:id", checkAuth, controller.deletarCozinha)

module.exports = router