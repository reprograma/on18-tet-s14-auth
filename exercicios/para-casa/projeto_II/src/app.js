require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const database = require("./config/database");
const cozinhaRoutes = require("./routes/cozinhaRoutes");

app.use(cors());
app.use(express.json());

app.use("/cozinha", cozinhaRoutes);

database.connect();

module.exports = app;



