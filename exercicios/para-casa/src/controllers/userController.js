const mongoose = require("mongoose");
const UserSchema = require('../models/UserSchema')
const bcrypt = require("bcrypt");

const criarUsuario = async (request, response) => {
    const { email } = request.body;

    const senhaHasheada = bcrypt.hashSync(request.body.password, 10)
    request.body.password = senhaHasheada
    
    //verifica se o email já está cadastrado
    const emailExiste = await UserSchema.exists({
        email: request.body.email
    })
    if (emailExiste) {
        return response.status(409).send({
            message: 'Esse email já foi cadastrado!',
        })
    }
    
    // //verifica se o email possui @
    // const verificaArroba = email.indexOf('@')
    // if (verificaArroba == -1) {
    //     return response.status(401).send({
    //         message: 'O endereço de email está inválido. Caracter a menos: arroba [ @ ]',
    //     })
    // }
    
    // //verifica se o email possui ponto após o ARROBA
    // const verificaPonto = email.includes(".", verificaArroba);
    // if (!verificaPonto) {
    //     return response.status(401).send({
    //         message: 'O endereço de email está inválido. Caracter a menos: ponto [ . ]'
    //     })
    // }
    
    //verifica se o email possui caracter depois do PONTO + 2 de cima
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
        return response.status(401).send({
            message: 'Email inválido!',
        })
    }
    
    try {
        const novoUsuario = new UserSchema(request.body)
        const salvarUsuario = await novoUsuario.save()
        response.status(201).send({
            message: 'Usuário cadastrado com sucesso!',
            salvarUsuario,
        })

    } catch (err) {
        response.status(500).send({
            message: err.message,
        })
    }
}

//mantive o getAll por ser uma aplicação da gestão, onde é importante visualizar todos os usuarios cadastrados
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

module.exports = {
    criarUsuario,
    getAll
}