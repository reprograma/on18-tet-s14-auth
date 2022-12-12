const app = require('./src/app');
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Servidor da Semana 14 rodando na porta ${PORT}!`))