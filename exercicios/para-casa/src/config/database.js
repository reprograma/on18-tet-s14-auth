const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Banco de dados Conectado! :D")
    } catch (error) {
        console.error("Erro: ", error.message)
    }
}

module.exports = {
    connect
}