const CozinhasSchema = require("../models/cozinhaSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const SECRET = process.env.SECRET

const login = (request, response) => {
    try {
        CozinhasSchema.findOne({ email: request.body.email }, (error, user) => {
            if (!user) {
                return response.status(404).send({
                    message: "Cadastro não encontrado!",
                    email: `${request.body.email}`
                })

            }

            const validarSenha = bcrypt.compareSync(request.body.senha, user.senha)

            if (!validarSenha) {
                return response.status(401).send({
                    message: "Senha inválida!"
                })
            }

            const token = jwt.sign({ nome: user.nome }, SECRET)

            response.status(200).send({
                message: "Login realizado com sucesso!",
                token
            })
        })
        
    } catch (error) {
        response.status(500).send({
            message: error.message
        })
    }
}


module.exports = {
    login
}