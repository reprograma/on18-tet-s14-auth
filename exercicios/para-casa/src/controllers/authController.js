const UserSchema = require('../models/UserSchema'); // importei o model
const bcrypt = require('bcrypt'); // importei o bcrypt para criptografar a senha
const jwt = require('jsonwebtoken'); // importei o jwt para gerar o token

const SECRET = process.env.SECRET; // importei a secret para ser usada pelo JWT na geracao do token

const login = (request, response) => {
    try {

        UserSchema.findOne({ email: request.body.email }, (error, user) => {
            console.log("O Usuário está correto!", user)
            if (!user) {
                return res.status(404).send({
                    message: 'Usuário não encontrado!',
                    email: `${request.body.email}`
                });
            }

            // quando eu chego aqui eu tenho um usuario que foi enviado no body da requisicao e um usuario no banco com o MESMO email
            // eu preciso saber se as senhas deles tambem sao iguais

            const validPassword = bcrypt.compareSync(request.body.senha, user.senha)
            console.log("A senha está correta?", validPassword)

            if (!validPassword) {
                return response.status(401).send({
                    message: "Lamento, mas sua senha esta incorreta!",
                    statusCode: 401
                })
            }

            // jwt.sign(nome do usuário, SEGREDO)
            const token = jwt.sign({ nome: user.nome }, SECRET);
            console.log("TOKEN CORRETO", token)

            response.status(200).send({
                message: "Olá, voce esta logada!",
                token
            })
        })
    } catch (err) {
        console.error(err)
    }
};

module.exports = {
    login
};