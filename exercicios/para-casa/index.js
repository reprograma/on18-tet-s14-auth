const app = require('./src/app');
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Bem vindes à Cozinha Comunitária [${PORT}]`))