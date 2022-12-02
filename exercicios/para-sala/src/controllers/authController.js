const UserSchema = require('../models/userSchema');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');


const SECRET = process.env.SECRET;


const login = (request, response) => {
    try{
       UserSchema.findOne({email: request.body.email}, (error, user) => {
        if(user){
            console.log(user)
        }if(!user){
            return response.status(404).send({
                message: "usuário não encontrado",
                email: `${request.body.email}`
            })
        }

        const validPassword = bcrypt.compareSync(request.body.password, user.password)
        console.log("Senha válida", validPassword)
        
        if(!validPassword){
            return response.status(401).send({
                "message": "Senha inválida"
            })
        }

        const token = jwt.sign({name: user.name}, SECRET);
        console.log(token)
        response.status(200).send({
            message: "Login realizado com sucesso",
            token
        })
    })

    }catch(error){
        console.error(error)
    }
    
};

module.exports = {
    login
};