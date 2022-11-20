const express = require("express");
const router = express.Router();

const controller = require("../controllers/bibliotecaController");
const authController = require("../controllers/authController");

const { checkAuth } = require('../middlewares/auth')

router.get("/all", checkAuth, controller.getAll);
router.post("/create", controller.createUser);
router.post("/login", authController.login);
router.post("/criar", controller.criarBiblioteca);
router.get("/buscar", controller.buscarBibliotecas);
router.get("/:id", controller.buscarBibliotecaPorId);
router.delete("/:id", controller.deletarBiblioteca);

module.exports = router;