const routes = require("express").Router();
const controller = require("../controllers/bibliotecaController");
const { tryCatchWrapper } = controller;
const { checkAuth } = require("../middlewares/auth");

routes.get("/", tryCatchWrapper(controller.get));
routes.post("/", tryCatchWrapper(controller.post));
routes.get("/:id", tryCatchWrapper(controller.getById));
routes.delete("/:id", checkAuth, tryCatchWrapper(controller.deleteById));
routes.patch("/:id", checkAuth, tryCatchWrapper(controller.patchById));

module.exports = routes;
