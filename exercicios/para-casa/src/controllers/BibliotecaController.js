const Biblioteca = require("../models/BibliotecaModel")
const bcrypt = require("bcrypt");
const UserSchema = require("../models/UserSchema")

const buscarBibliotecas = async(req, res) => {
    try {
        const bibliotecas = await Biblioteca.find({})

        return res.status(200).json({bibliotecas})
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const buscarBibliotecaPorId = async(req, res) => {
    try {
        const bibliotecas = await Biblioteca.findById(req.params.id)

        return res.status(200).json({bibliotecas})
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const criarBiblioteca = async(req, res) => {
    const {
        nome, 
        cnpj,
        telefone,
        iniciativaPrivada,
        endereco,
        cep,
        rua,
        numero,
        complemento,
        referencia,
        estado,
        cidade,
        bairro,
        bairrosQueAtuam,
        site,
        atividadesDisponiveis,
        pessoaResponsavel
    } = req.body;

    try {
        const biblioteca = new Biblioteca({
            nome: nome,
            cnpj: cnpj,
            telefone: telefone,
            iniciativaPrivada: iniciativaPrivada,
            endereco: endereco,
            cep: cep,
            rua: rua,
            numero: numero,
            complemento: complemento,
            referencia: referencia,
            estado: estado,
            cidade: cidade,
            bairro: bairro,
            bairrosAtuantes: bairrosQueAtuam,
            site: site,
            atividadesDisponiveis: atividadesDisponiveis,
            pessoaResponsavel: pessoaResponsavel
        })

        const bibliotecaCriada = await biblioteca.save();

        res.status(201).json({
            biblioteca: bibliotecaCriada
        })
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deletarBiblioteca = (req, res) => {
    try {
        const bibliotecaDeletada = Biblioteca.findOneAndDelete(req.params.id)

        res.status(200).json({bibliotecaDeletada})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const criarUsuario = (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
  
    const emailExists = await UserSchema.exists({ email: req.body.email })
  
    if (emailExists) {
      return res.status(409).send({
        message: 'O email digitado ja foi cadastrado. Tente outro',
      })
    }
  
    try {
      const newUser = new UserSchema(req.body)
  
      const savedUser = await newUser.save()
  
      res.status(201).send({
        message: 'Usuario cadastro com sucesso',
        savedUser,
      })
    } catch (err) {
      console.error(err)
      res.status(500).send({
        message: err.message,
      })
    }
}

const buscarUsuarios = async (req, res) => {
    UserSchema.find(function (err, users) {
      if (err) {
        res.status(500).send({ message: err.message })
      }
      res.status(200).send(users)
    })
  }

module.exports = {
    buscarBibliotecas,
    buscarBibliotecaPorId,
    criarBiblioteca,
    deletarBiblioteca,
    criarUsuario,
    buscarUsuarios
}

