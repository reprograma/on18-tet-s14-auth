const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const db = require('./config/database');
const userRoutes = require('./routes/bibliotecaRoutes');

db.connect() ;

app.use(cors());
app.use(express.json());
app.use("/bibliotecas", userRoutes);

module.exports = app;