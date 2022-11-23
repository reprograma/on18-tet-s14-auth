const express = require("express");
const router = express.Router();


const controller = require("../controller/bibliotecaController");
const authController = require("../controller/authController")
const userController = require("../controller/userController")


const { checkAuth } = require("../middleware/auth")

router.get("/", controller.getBiblioteca)
router.post("/", checkAuth, controller.criarBiblioteca)
router.get("/:id", controller.getById)
router.delete("/:id", checkAuth, controller.deleteById)
router.patch("/:id", checkAuth,controller.atualizaTelefone)
router.post("/create", userController.createUser)
router.post("/login", authController.login)

module.exports = router;