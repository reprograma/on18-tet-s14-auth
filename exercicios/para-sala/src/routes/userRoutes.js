const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");
const authController = require("../controllers/authController")

const { checkAuth } = require("../middlewares/auth")


router.get("/all", checkAuth ,controller.getAll);
router.post("/create", controller.creatUser);
router.post("/login", authController.login);

module.exports = router;
