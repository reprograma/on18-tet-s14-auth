const express = require("express")
const cors = require("cors")
const app = express()

require("dotenv").config()

const database = require("./config/database")
const cozinhaRoutes = require("./routes/cozinhaRoutes")
const userRoutes = require("./routes/userRoutes")



database.connect()

app.use(cors())
app.use(express.json())
app.use("/cozinha", cozinhaRoutes)
app.use("/usuarios", userRoutes)

module.exports = app




