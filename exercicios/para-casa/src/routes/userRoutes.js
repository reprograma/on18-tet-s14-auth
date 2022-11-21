const express = require("express");
const router = express.Router();


const controller = require("../controllers/userController");
const authController = require("../controllers/authController");

const { checkAuth } = require("../middlewares/auth");

router.post("/create", controller.criarUsuario);
router.post("/login", authController.login);

module.exports = router;