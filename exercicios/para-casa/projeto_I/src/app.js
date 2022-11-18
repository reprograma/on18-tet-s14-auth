require("dotenv").config()

const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./database/mongoConfig")
const bibliotecaRoutes = require("./routes/bibliotecaRoutes")

app.use(express.json())
app.use(cors())

app.use('/biblioteca', bibliotecaRoutes)

db.connect()

module.exports = app
