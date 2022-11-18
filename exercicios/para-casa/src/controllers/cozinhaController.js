const mongoose = require("mongoose");
const userSchema = require("../models/userSchema");
const CozinhaSchema = require("../models/CozinhaSchema");
const bcrypt = require('bcrypt');

const criarCozinha = async(req, res) =>{
    const { nome, cnpj, iniciativa_privada, endereco, bairros_atuacao, site, 
        atividades_disponiveis, responsavel_cozinha, } = req.body;

try{
    const cozinha = new CozinhaSchema({
        nome: nome,
        cnpj: cnpj,
        iniciativa_privada: iniciativa_privada,
        endereco: endereco,
        bairros_atuacao: bairros_atuacao,
        site: site,
        atividades_disponiveis: atividades_disponiveis,
        responsavel_cozinha: responsavel_cozinha    
    })
            

    const salvarCozinha = await cozinha.save();
    res.status(201).json({
        cozinha: salvarCozinha
    })

} catch (error) {
    res.status(400).json({
        message: error.message
    })

}
}

const buscarTodasCozinhas = async (req, res) => {
    try {
        const cozinha = await CozinhaSchema.find()

        if (cozinha.length > 1) {
            return res.status(200).json({ message: `Encontramos ${cozinha.length} cozinhas.`, cozinha })
        } else if (cozinha.length == 1) {
            return res.status(200).json({ message: `Encontramos ${cozinha.length} cozinha.`, cozinha })
        } else {
            return res.status(404).json({ message: `Não encontramos nenhuma cozinha até o momento.` })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const buscarCozinhaId = async (req, res) => {
    const { id } = request.params
    try {
        if (id.length < 24 || id.length > 24) {
            return res.status(404).json({
                message: "Id incorreto"
            })
        }
        const cozinha = await CozinhaSchema.find({ id })
        if (cozinha.length == 0) {
            return res.status(200).json({ message: `Cozinha não encontrada.` })
        }
        res.status(200).json(cozinha)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deletarCozinha = async (req, res) => {
    const { id } = request.params
    try {
        if (id.length < 24 || id.length > 24) {
            return res.status(404).json({ message: ` Id incorreto` })
        }
        const cozinhaEncontrada = await CozinhaSchema.deleteOne({ id })
        if (cozinhaEncontrada.deletedCount === 1) {
            return res.status(200).send({ message: `Cozinha deletada com sucesso!` })
        } else {
            return res.status(404).send({ message: "A cozinha não foi encontrada." })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const atualizarCozinha = async (request, response) => {
    const {
        id
    } = request.params
    const {
        nome,
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
    } = request.body;

    try {
        if (id.length < 24 || id.length > 24) {
            return response.status(404).json({
                message: `Por favor digite o id da cozinha corretamente, o mesmo possui 24 caracteres.`
            })
        }
        const cozinhaEncontrada = await CozinhaSchema.updateOne({
            nome,
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
        })
        const cozinhaporId = await CozinhaSchema.find({
            id
        })
        if (cozinhaporId.length == 0) {
            return response.status(404).json({
                message: `A cozinha não foi encontrada.`
            })
        }
        response.json({
            cozinhaporId
        })

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}


const listarTodos = async (req, res) => {

    CozinhaSchema.find(function (err, users) {
      if (err) {
        res.status(500).send({ message: err.message })
      }
      res.status(200).send(users)
    })
  }


  const cadastrarUsuario = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
  
    const emailExists = await UserSchema.exists({ email: req.body.email })
  
    if (emailExists) {
      return res.status(409).send({
        message: 'Email já cadastrado',
      })
    }
  
    try {
      const newUser = new UserSchema(req.body)
  
      const savedUser = await newUser.save()
  
      res.status(201).send({
        message: 'User criado',
        savedUser,
      })
    } catch (err) {
      console.error(err)
      res.status(500).send({
        message: err.message,
      })
    }
  }
  

module.exports ={
    criarCozinha,
    buscarCozinhaId,    
    deletarCozinha,
    buscarTodasCozinhas,
    atualizarCozinha,
    listarTodos,
    cadastrarUsuario

}