
const UserSchema = require('../models/userSchema'); 
const bcrypt = require('bcrypt'); // importei o bcrypt para criptografar a senha
const jwt = require('jsonwebtoken'); // importei o jwt para gerar o token

const SECRET = process.env.SECRET; // importei a secret para ser usada pelo JWT na geracao do token

const login = (req,res) =>{
    try {
        
        UserSchema.findOne({ email: req.body.email }, (error, user) => {
            console.log("O usuário eh :", user)
            if(!user) {
                return res.status(404).send({
                    message: 'Usuário não encontrado',
                    email: `${req.body.email}`
                });
            }
            const validPassword = bcrypt.compareSync(req.body.password, user.password)
            console.log("Senha válida?", validPassword)
            
            if(!validPassword){
                return res.status(401).send({
                message: "Senha inválida.",
                statusCode: 401
                })
            } 

            const token = jwt.sign({name: user.name}, SECRET);
            console.log("Token de usuário: ", token)
            
            res.status(200).send({
                message: "Login efetuado.",
                token
            })
        })


    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    login
}