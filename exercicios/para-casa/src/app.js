const express = require("express")
const cors = require("cors")
const app = express()

require("dotenv").config()

const dataBase = require("./config/database")
const cozinhaRoutes = require("./routes/cozinhaRoutes")

dataBase.connect()

app.use(cors())
app.use(express.json())
app.use("/cozinhas", cozinhaRoutes)

module.exports = app



