require('dotenv').config();

const app = require('./src/app');

const PORT = process.env.PORT;

// app.get('/', function(req, res) {
//     res.send({
//         message: 'xxx'
//     })
// })

app.listen(PORT, () => console.log('Rodando Ler é Saber'));