const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const db = require('./config/database');
const bibliotecaRoutes = require("./routes/bibliotecaRoutes");
const userRoutes = require('./routes/userRoutes');

db.connect() ;

app.use(cors());
app.use(express.json());
app.use("/bibliotecas", bibliotecaRoutes);
app.use("/users", userRoutes)

module.exports = app;