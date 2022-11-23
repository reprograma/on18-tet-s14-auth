const mongoose = require("mongoose");

const bibliotecaSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        default:mongoose.Types.ObjectId
    },
    nome: {
        type: String,
        required: true 
    },
    cnpj:{
        type: Number,
        required: true
    },
    telefone:{
        type: Number,
        required: false
    },
    iniciativa_privada:{
        type: Boolean,
        required: true
    },
    endereco:{
        cep:{
            type: String,
            required: true
        },
        rua:{
            type: String,
            required: true
        },
        numero:{
            type: Number,
            required: true
        },
        complemento:{
            type: String            
        },
        referencia:{
            type: String
        },
        estado: {
            type: String,
            required: true
        },
        cidade:{
            type: String,
            required: true
        },
        bairro:{
            type: String,
            required: true
        }

    },
    bairros_atuantes:{
        type: Array,
    },
    site:{
        type: String,
        required: false
    },
    atividades_disponiveis:{
        type: Array,
    },
    responsavel:{
        type: String,
        required: true
    }


}, {timestamp: true})

module.exports = mongoose.model("biblioteca", bibliotecaSchema);




