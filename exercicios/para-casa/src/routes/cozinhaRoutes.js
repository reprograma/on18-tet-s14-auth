const express = require("express");
const router = express.Router();

const cozinhaController = require("../controllers/cozinhaController")

const { checkAuth } = require("../middlewares/auth");

//rotas da cozinha
router.get("/all", cozinhaController.buscarTodasCozinhas);
router.post("/create", checkAuth, cozinhaController.criarCozinha);
router.get("/search/:id", cozinhaController.buscarCozinhaId)
router.delete("/delete/:id", checkAuth, cozinhaController.deletarCozinha)
router.patch("/update/:id", checkAuth, cozinhaController.atualizarCozinha)

module.exports = router;