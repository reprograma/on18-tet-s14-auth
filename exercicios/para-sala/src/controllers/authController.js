const UserSchema = require('../models/userSchema'); //importei o model
const bcrypt = require('bcrypt');//importei o bcrypt para criptografar a senha
const jwt = require('jsonwebtoken');//importe o jwt para gerar o token


const SECRET = process.env.SECRET; //importei a secret para ser usada pelo JWT na geração do token
//>header
//>payload
//>asinatura - cripto head+cripto payload + SECRET
const login = (req, res) => {
    try{
        UserSchema.findOne({ email:req.body.email}, (error, user) => {
            console.log("usuario eh esse aqui", user)
            if(!user){
                return res.status(404).send({
                    message: 'Usuario não encontrado',
                    email: `${req.body.email}`
                });
            }
            
            //quando eu chegar aqui, eu tenho um usuario que foi enviado no body de requisição e um usuario no banco com o mesmo email
            //eu preciso saber se as senhas deles também são iguais
            const validPassword = bcrypt.compareSync(req.body.password, user.password)
            console.log("a senha é válida, amor?", validPassword)

            if(!validPassword){
                return res.status(401).send({
                    "message": "Amor, sua senha está inválida",
                    "statusCode": 401
                })
            }

            const token = jwt.sign({name: user.name}, SECRET);
            console.log("O TOKEN EH ESSE AQUI", token)

            res.status(200).send({
                message: "Amor, vc está logadah",
                token
            })

        })
           
    } catch(err) {
        console.error(err)
    }
};

module.exports = {
    login
};