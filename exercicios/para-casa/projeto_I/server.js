require('dotenv').config();

const app = require("./src/app");

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Projeto I ler é saber rodando na porta ${PORT}!`))