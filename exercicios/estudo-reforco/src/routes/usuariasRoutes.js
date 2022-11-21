const express = require("express")

const router = express.Router()

const controller = require("../controllers/usuariasController")

const authController = require("../controllers/authController")

const { checkAuth } = require("../middlewares/auth")

router.get("/buscar", checkAuth, controller.getAll)
router.post("/create", controller.criarUsuaria)
router.post("/login", authController.login)

module.exports = router

