const mongoose = require("mongoose");
const { Schema } = mongoose;

const enderecoSchema = new Schema({
  cep: { type: String, required: true },
  rua: { type: String, required: true },
  numero: { type: Number, required: true },
  complemento: { type: String, required: false },
  referencia: { type: String, required: false },
  estado: { type: String, required: true },
  cidade: { type: String, required: true },
  bairro: { type: String, required: true },
});

// OK SO WHAT NOW?
const nameValidator = async (val) => {
  console.log(this);
  const count = await Biblioteca.countDocuments({
    name: val,
  });
  return !count;
};

const cnpjValidator = async (val) => {
  const count = await Biblioteca.countDocuments({ cnpj: val });
  return !count;
};

const bibliotecaSchema = new Schema(
  {
    _id: mongoose.ObjectId,
    nome: {
      type: String,
      required: true,
      validate: [
        nameValidator,
        `Biblioteca with same name already exists in selected bairro.`,
      ],
    },
    cnpj: {
      type: String,
      required: true,
      validate: [cnpjValidator, "Already Exists!"],
    },
    telefone: { type: String, required: true },
    privada: { type: Boolean, required: true },
    endereco: { type: enderecoSchema, required: true },
    bairros: [String],
    site: { type: String, required: false },
    atividades: [String],
    responsavel: { type: String, required: true },
  },
  { timestamps: true }
);

const Biblioteca = mongoose.model("Biblioteca", bibliotecaSchema);

module.exports = Biblioteca;
