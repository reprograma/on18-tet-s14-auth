require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

require('dotenv').config()

const database = require("./database/mongoConfig");
const bibliotecaRoutes = require("./routes/bibliotecaRoutes")

app.use(cors());
app.use(express.json());

app.use("/biblioteca", bibliotecaRoutes)

database.connect();

module.exports = app