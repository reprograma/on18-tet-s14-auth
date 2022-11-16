const mongoose = require('mongoose')

const bibliotecaSchema = new mongoose.Schema({


 /* id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId,
   
  },*/

  nome: {
    type: String,
    required : false
    
  },

  cnpj: {
    type: String,
    required : false
    
    
  },

  telefone: {
    type: String,
  },

  iniciativa_privada: {
    type: Boolean
  },

  
  endereco: {
    cep: {
      type: String,
      required: false
  },
  rua: {
      type: String,
      required: false
  },
  numero: {
      type: Number,
      required: false
  },
  complemento: {
      type: String,
      required: false
  },
  referencia: {
      type: String,
      required: false
  },
  estado: {
      type: String,
      required: false
  },
  cidade: {
      type: String,
      required: false
  },
  bairro: {
      type: String,
      required: false
  }
},


  bairros_atuantes: [],

  site: [{
    type: String,
    required : false
  }],
  
  atividades_disponiveis: [],


  pessoa_responsavel: {
    type: String,
    required : false
   
    
  }


}, { timestamps: true })

module.exports = mongoose.model('biblioteca', bibliotecaSchema)
