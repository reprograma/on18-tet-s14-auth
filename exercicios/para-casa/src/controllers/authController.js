const UserSchema = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

const login = (request, response) => {
    const { email } = request.body

    //verifica se o email possui @
    const verificaArroba = email.indexOf('@')
    if (verificaArroba == -1) {
        return response.status(409).send({
            message: 'O endereço de email está inválido. Caracter a menos: arroba [ @ ]',
        })
    }

    //verifica se o email possui ponto após o ARROBA
    const verificaPonto = email.includes(".", verificaArroba);
    if (!verificaPonto) {
        return response.status(404).send({
            message: 'O endereço de email está inválido. Caracter a menos: ponto [ . ]'
        })
    }

    // //verifica se o email possui caracter depois do PONTO

    try {

        UserSchema.findOne({ email: request.body.email }, (error, user) => {

            if (!user) {
                return response.status(404).send({
                    message: 'Usuário não encontrado'
                });
            }

            const validPassword = bcrypt.compareSync(request.body.password, user.password)

            if (!validPassword) {
                return response.status(401).send({
                    message: "Senha inválida."
                })
            }

            // jwt.sign(nome do usuário, SEGREDO)
            const token = jwt.sign({ name: user.name }, SECRET);

            response.status(200).send({
                message: "Login efetuado com sucesso!",
                token
            })
        })
    } catch (err) {
        response.status(500).send({
            message: err.message,
        })
    }
};

module.exports = {
    login
};