const mongoose = require("mongoose");
const UserSchema = require("../models/UserSchema");
const CozinhaSchema = require("../models/CozinhaSchema");
const bcrypt = require('bcrypt');


const criarUsuario = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    const emailExists = await UserSchema.exists({
        email: req.body.email
    })

    if (emailExists) {
        return res.status(409).send({
            message: 'Esse email já foi cadastrado!',
        })
    }

    try {
        const newUser = new UserSchema(req.body)

        const savedUser = await newUser.save()

        res.status(201).send({
            message: 'Usuário cadastrado com sucesso!',
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

const buscarTodasCozinhas = async (request, response) => {
    try {

        const cozinha = await CozinhaSchema.find()

        if (cozinha.length > 1) {
            return response.status(200).json({
                message: `Encontramos ${cozinha.length} cozinhas.`,
                cozinha
            })
        } else if (cozinha.length == 1) {
            return response.status(200).json({
                message: `Encontramos ${cozinha.length} cozinha.`,
                cozinha
            })
        } else {
            return response.status(404).json({
                message: `Nenhuma cozinha está cadastrada até o momento.`
            })
        }

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

const buscarCozinhaId = async (request, response) => {
    const {
        id
    } = request.params

    try {
        if (id.length < 24 || id.length > 24) {
            return response.status(404).json({
                message: `Por favor digite o id da cozinha corretamente, o mesmo possui 24 caracteres.`
            })
        }
        const cozinha = await CozinhaSchema.find({
            id
        })
        if (cozinha.length == 0) {
            return response.status(200).json({
                message: `A cozinha não foi encontrada.`
            })
        }
        response.status(200).json(cozinha)

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

const criarCozinha = async (request, response) => {
    const {
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
    } = request.body;

    const buscaBairro = await CozinhaSchema.find({
        bairro
    })
    //filtrei as cozinhas que tem o bairro que a pessoa digitou
    let existeBairro = buscaBairro.filter((cozinha) => cozinha.endereco.bairro === bairro)
    
    //verifiquei se vai encontrar no array do filter UMA cozinha
    let nomeExisteBairro = existeBairro.find((cozinha) => cozinha.nome === nome)

    if (nomeExisteBairro) {
        return response.status(404).json({
            message: `Não é possível cadastrar essa cozinha, esse nome já existe neste bairro.`
        });
    }

    const buscaCnpj = await CozinhaSchema.find({
        cnpj
    })

    if (buscaCnpj.length !== 0) { //array zerado ou array encontrado
        return response.status(400).json({
            message: `Não é possível cadastrar, esse número de cnpj já existe.`
        });
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
                bairro: bairro
            },
            bairros_atuantes: bairros_atuantes,
            site: site,
            atividades_disponiveis: atividades_disponiveis,
            pessoa_responsavel: pessoa_responsavel
        })

        const salvarCozinha = await cozinha.save();
        response.status(201).json({
            cozinha_cadastrada: salvarCozinha
        })

    } catch (error) {
        response.status(400).json({
            message: error.message
        })

    }
}

const deletarCozinha = async (request, response) => {
    const {
        id
    } = request.params

    try {
        if (id.length < 24 || id.length > 24) {
            return response.status(404).json({
                message: `Por favor digite o id da cozinha corretamente, o mesmo possui 24 caracteres.`
            })
        }
        const cozinhaEncontrada = await CozinhaSchema.deleteOne({
            id
        })
        if (cozinhaEncontrada.deletedCount === 1) {
            return response.status(200).send({
                message: `A cozinha foi deletada com sucesso!`
            })
        } else {
            return response.status(404).send({
                message: "A cozinha não foi encontrada."
            })
        }

    } catch (error) {
        response.status(500).json({
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

module.exports = {
    criarUsuario,
    getAll,
    buscarTodasCozinhas,
    buscarCozinhaId,
    criarCozinha,
    deletarCozinha,
    atualizarCozinha
}