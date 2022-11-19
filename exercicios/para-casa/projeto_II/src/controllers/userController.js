const UserSchema = require("../models/UserSchema");
const bcrypt = require("bcrypt");

const criarUsuario = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword

    const checaEmail = await UserSchema.exists({ email: req.body.email })

    if(checaEmail){
        return res.status(409).send({
            mensagem: "Email já cadastrado"
        })
    }
    
    try {
        const novoUsuario = new UserSchema(req.body)
        
        const usuarioSalvo = await novoUsuario.save()
        
        res.status(201).send({
            mensagem: "Seu usuário foi criado! :D",
            usuarioSalvo
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({
            mensagem: error.message
        })
    }
}

module.exports = {
    criarUsuario
}