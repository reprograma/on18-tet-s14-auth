require('dotenv').config()

const express = require('express');
const cors = require('cors');
const database = require('./database/mongoConfig');
const cozinhaRoutes = require("./routes/cozinhaRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/cozinha", cozinhaRoutes);

database.connect();

module.exports = app;