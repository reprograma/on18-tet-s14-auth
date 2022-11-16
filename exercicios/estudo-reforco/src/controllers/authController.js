
// importei a model
const UsuariaSchema = require("../models/usuariasSchema")

// importei o bcrypt(lib) para criptografar a senha
const bcrypt = require("bcrypt")

// importei o jwt para gerar o token
const jwt = require("jsonwebtoken")

// importei a secret para o ser usada pelo jwt(lib) na geração do token. Esse token vai dizer o que vc tem acesso que o vc não tem acesso
const SECRET = process.env.SECRET



const login = (request, response) => {
    try {

        UsuariaSchema.findOne({ email: request.body.email }, (error, usuaria) => {
            if (!usuaria) {
                response.status(404).send({
                    message: "Usurária não encontrada!",
                    email: `${request.body.email}`
                })
            }
            // bcrypt tem essa função compare que compara um coisa com a outra

            const validPassword = bcrypt.compareSync(request.body.password, usuaria.password)

            if (!validPassword) {
                return response.status(401).send({
                    message: "Sua senha é invalida",
                    satusCode: 401
                })
            }

            const token = jwt.sign({ name: usuaria.name }, SECRET)

            response.status(200).send({
                message: "Você está logada",
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