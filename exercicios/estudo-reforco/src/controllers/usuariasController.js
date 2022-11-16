const UsuariasSchema = require("../models/usuariasSchema")

const bcrypt = require("bcrypt")

const getAll = async (request, response) => {
    UsuariasSchema.find(function (err, usuarias) {
        if (err) {
            response.status(500).send({ message: err.message })
        }
        response.status(200).send(usuarias)
    })
}



const criarUsuaria = async (request, response) => {

    // gera a criptografia para a senha, com a qauntidade de caracteres que eu disse
    const hashedPassword = bcrypt.hashSync(request.body.password, 10)

    request.body.password = hashedPassword

    const emailExists = await UsuariasSchema.exists({ email: request.body.email })

    if (emailExists) {
        return response.status(409).send({
            message: "Email já cadastrado"
        })
    }

    try {
        const novaUsuaria = new UsuariasSchema(request.body)

        const salvarUsuaria = await novaUsuaria.save()

        response.status(201).send({
            message: "Usuária cadastrada!",
            salvarUsuaria
        })

    } catch (error) {
        response.status(500).send({
            message: error.message
        })
    }



}

module.exports = {
    getAll,
    criarUsuaria
}