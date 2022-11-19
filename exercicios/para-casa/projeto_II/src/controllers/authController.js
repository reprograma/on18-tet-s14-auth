const UserSchema = require("../models/UserSchema"); // importei o model
const bcrypt = require("bcrypt"); // importei bcrypt para criptografar a senha
const jwt = require("jsonwebtoken"); // importei o jwt para gerar o token

const SECRET = process.env.SECRET // a secret foi importada para ser usada pelo jwt na geração do token

const login = (req, res) => {
    try {

        UserSchema.findOne({ email: req.body.email }, (error, user) => {
            console.log("O usuário é esse: ", user)
            if(!user){
                return res.status(404).send({
                    mensagem: 'Usuário não encontrado',
                    email: `${req.body.email}`
                });
            }

            const validPassword = bcrypt.compareSync(req.body.password, user.password);
            console.log("A senha é valida?", validPassword)

            if(!validPassword){
                return res.status(401).send({
                    mensagem: 'Senha inválida!',
                    statusCode: 401   
                })
            }

            const token = jwt.sign({ nome: user.nome }, SECRET);
            console.log("O token é esse aqui", token)

            res.status(200).send({
                mensagem: 'Você está logada!',
                token
            })
        })
    } catch (error) {
        console.error(error)
    }
};

module.exports = {
    login
}