const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController")

const { checkAuth } = require("../middlewares/auth");

//rotas de users
router.get("/all", checkAuth, userController.getAll);
router.post("/create", userController.criarUsuario);
router.post("/login", authController.login);

module.exports = router;