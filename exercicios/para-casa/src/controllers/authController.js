const UserSchema = require('../models/UserSchema'); // importou a model
const bcrypt = require('bcrypt'); // importou o bcrypt para criptografar a senha
const jwt = require('jsonwebtoken'); // importou o jwt para gerar o token

const SECRET = process.env.SECRET;

const login = (req, res) => {
    try {
        UserSchema.findOne({ email: req.body.email }, (error, user) => {
           console.log("Usuário: ", user)
           
           if(!user) {
            return res.status(404).send({
                message: "Usuário não encontrado",
                email: `${req.body.email}`
            })
           }

           const validPassword = bcrypt.compareSync(req.body.password, user.password)
           console.log("Senha válida?", validPassword)

           if(!validPassword) {
            return res.status(401).send({
                message: "Senha inválida",
                statusCode: 401
            })
           }

           const token = jwt.sign({name: user.name}, SECRET);
           console.log("O token gerado foi: ", token)

           res.status(200).send({
            message: "Logado!",
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