const express = require('express')
const cors = require('cors')
const app = express()


//require('dotenv-safe').config()
require('dotenv').config()

//Rota da Biblioteca
const db = require('./database/mongoConfig')
const bibliotecaRoutes = require('./routes/bibliotecaRoutes')

//Rota de autenticação
const bancoAut = require('./config/database')
const userRoutes = require('./routes/userRoutes')

//Conexão
db.connect()
bancoAut.conecta()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/bibliotecas",bibliotecaRoutes)
//Rota de autenticação
app.use("/users", userRoutes)



module.exports = app