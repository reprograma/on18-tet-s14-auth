const CozinhaSchema = require('../models/CozinhaSchema')
const mongoose = require("mongoose");
const UserSchema = require("../models/UserSchema");
const bcrypt = require('bcrypt');


const criarUsuario = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    const emailExists = await UserSchema.exists({
        email: req.body.email
    })

    if (emailExists) {
        return res.status(409).send({
            message: 'E-mail já cadastrado',
        })
    }

    try {
        const newUser = new UserSchema(req.body)

        const savedUser = await newUser.save()

        res.status(201).send({
            message: 'Usuário cadastrado com sucesso!:D',
            savedUser,
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            message: err.message,
        })
    }
}

const getAll = async (req, res) => {
    UserSchema.find(function (err, users) {
        if (err) {
            res.status(500).send({
                message: err.message
            })
        }
        res.status(200).send(users)
    })
}


const criarCozinha = async (req, res) => {
    const  {
        id,
        nome,
        cnpj,
        iniciativa_privada,
        endereco: {
            cep,
            rua,
            numero,
            complemento,
            referencia,
            estado,
            cidade,
            bairro
        },
        bairros_atuantes,
        site,
        atividades_disponiveis,
        pessoa_responsavel
    } = req.body

    const buscarCnpj = await CozinhaSchema.find({ cnpj })

    //Regras de negócio: Não poderá existir cozinha com o mesmo cnpj;

    if (buscarCnpj.length !== 0) {
      return response.status(400).json({ Alerta: `CNPJ já existente` })
    }

    //Regra de negócio: Não aceitará CNPJ com menos de 14 caracteres;

    if (String(cnpj).length > 14) {
      return response
        .status(401)
        .json({
          Alerta: `Este CNPJ é inválido. Caracter a mais: ${
            Number(String(cnpj).length) - 14
          }`,
        })
    } else if (String(cnpj).length < 14) {
      return response
        .status(401)
        .json({
          Alerta: `Este CNPJ é inválido. Caracter a menos: ${
            14 - Number(String(cnpj).length)
          }`,
        })
    }

    //Regras de negócio: Não poderá existir cozinhas com o mesmo nome no mesmo bairro;

    const buscarBairro = await CozinhaSchema.find({ bairro })

    let checarBairro = buscarBairro.filter(
      (cozinha) => cozinha.endereco.bairro === bairro,
    )
    console.log(checarBairro)

    let nomeExisteBairro = checarBairro.find((cozinha) => cozinha.nome === nome)
    console.log(nomeExisteBairro)

    if (nomeExisteBairro) {
      return response
        .status(400)
        .json({ Alerta: `O nome desta cozinha já existe neste bairro` })
    }
try {
    const cozinha = new CozinhaSchema({
      id: id,
      nome: nome,
      cnpj: cnpj,
      iniciativa_privada: iniciativa_privada,
      endereco: {
        cep: cep,
        rua: rua,
        numero: numero,
        complemento: complemento,
        referencia: referencia,
        estado: estado,
        cidade: cidade,
        bairro: bairro,
      },
      bairros_atuantes: bairros_atuantes,
      site: site,
      atividades_disponiveis: atividades_disponiveis,
      pessoa_responsavel: pessoa_responsavel,
    })

    const salvarCozinha = await cozinha.save()
    res.status(201).json({
      mensagem: `Sua cozinha foi criada! :D`,
      salvarCozinha,
    })
  } catch (error) {
    res.status(401).json({
      message: error.message,
    })
  }
}

const buscarTodasCozinhas = async (req, res) => {
  try {
    const buscarCozinha = await CozinhaSchema.find()
    res.status(200).json(buscarCozinha)
  } catch (error) {
    res.status(500).json({
      mensagem: error.message,
    })
  }
}

const deletarCozinha = async (req, res) => {
  try {
    const { id } = req.params
    const deletarPorId = await CozinhaSchema.deleteone({ id })

    res.status(200).json({
      mensagem: `Cozinha excluída com sucesso!`,
    })
  } catch (error) {
    res.status(401).json({
      mensagem: error.message,
    })
  }
}


const atualizarCozinha = async (request, response) => {
    const { id } = request.params
    const { nome, iniciativa_privada,
        endereco: { cep, rua, numero, complemento, referencia, estado, cidade, bairro },
        bairros_atuantes, site, atividades_disponiveis, pessoa_responsavel } = request.body;
    try {
        if (id.length < 24 || id.length > 24) {
            return response.status(404).json({
                message: `Por favor digite o id da cozinha corretamente, o mesmo possui 24 caracteres.`
            })
        }
        const cozinhaEncontrada = await CozinhaSchema.updateOne({
            nome, iniciativa_privada,
            endereco: { cep, rua, numero, complemento, referencia, estado, cidade, bairro },
            bairros_atuantes, site, atividades_disponiveis, pessoa_responsavel
        })
        const cozinhaporId = await CozinhaSchema.find({ id })
        if (cozinhaporId.length == 0) {
            return response.status(404).json({
                message: `A cozinha não foi encontrada.`
            })
        }
        response.json({ cozinhaporId })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    
    criarUsuario,
    getAll,
    criarCozinha,
  buscarTodasCozinhas,
  deletarCozinha,
  atualizarCozinha,
  
}