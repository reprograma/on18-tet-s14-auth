const routes = require("express").Router();
const controller = require("../controllers/userController");
const { tryCatchWrapper } = require("../controllers/bibliotecaController");

routes.post("/", tryCatchWrapper(controller.createUser));
routes.get("/", tryCatchWrapper(controller.getAll));
routes.post("/login", tryCatchWrapper(controller.loginUser));

module.exports = routes;
