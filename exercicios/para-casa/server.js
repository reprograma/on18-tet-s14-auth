require('dotenv').config();

const app = require('./src/app');

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Servidor Iniciado na Porta ${PORT}`));