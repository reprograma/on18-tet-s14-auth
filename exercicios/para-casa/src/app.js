const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const db = require('./config/database');
const userRoutes = require('./routes/cozinhaRoutes');

db.connect();

app.use(cors());
app.use(express.json());
app.use("/cozinha", userRoutes);

module.exports = app;