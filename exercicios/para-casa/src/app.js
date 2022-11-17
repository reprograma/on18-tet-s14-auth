require('dotenv').config
const express = require('express')
const cors = require('cors');
const app = express();

const database = require('./database/mongooseConnect')
const routes = require('./routes/BibliotecaRoutes')

app.use(cors());
app.use(express.json());
app.use('/', routes)

database.connect();

module.exports = app;