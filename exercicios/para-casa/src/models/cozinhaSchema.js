const mongoose = require("mongoose")

const cozinhaSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    nome: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        required: true
    },
    iniciativa_privada: {
        type: Boolean
    },
    endereco: {
        cep: {
            type: String,
            required: true
        },
        rua: {
            type: String,
            required: true
        },
        numero: {
            type: Number,
            required: true
        },
        complemeto: {
            type: String
        },
        referencia: {
            type: String
        }
    },
    estado: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    bairro: {
        type: String,
        required: true
    },
    bairros_que_atuam: {
        type: Array,
        required: true
    },
    site: {
        type: String
    },
    atividades_disponiveis: {
        type: Array
    },
    pessoa_responsavel: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("cozinha", cozinhaSchema)

