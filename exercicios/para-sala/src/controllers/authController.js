const UserSchema = require('../models/userSchema'); // importei o model
const bcrypt = require('bcrypt'); // importar o bcrypt para criptografar a senha da usuária
const jwt = require('jsonwebtoken'); // importar o jwt para gerar o token

const SECRET = process.env.SECRET; // importar a secret para ser usada pelo JWT na geracao do token
// o JWT precisa da SECRET para gerar o token
// A SECRET é parte da assinatura

//1 PASSO  ENCONTRAR O E-MAIL SOLICITADO
const login = (req, res) => {
    try {   
        UserSchema.findOne({ email: req.body.email }, (error, user) => {
            console.log("O USUARIO EH ESSE AKI", user)
            if(!user) { // se não tiver usuário, retorne...
                return res.status(404).send({
                    message: 'Usuário não encontrado!',
                    email: `${req.body.email}`
                });
            }
      // O findOne é um étodo do MONGO e localiza apenas oq lhe foi repassado, ou seja um item.
     
    // 2 PASSO  VALIDAR SENHA
    // Quando eu chego aqui eu tenho um usuario que foi enviado no body da requisicao e um usuario no banco com o MESMO email
    // Para isso, eu preciso saber se as senhas deles tambem sao iguais.
    const validPassword = bcrypt.compareSync(req.body.password, user.password)
//compareSync é uma função do bcrypt que compara um item do body com um item do banco de dados    
        console.log("A SENHA EH VALIDA, AMOR?", validPassword)    
            if(!validPassword){ //se a senha for incorreta, retorne ...
                return res.status(401).send({
                message: "Amor, sua senha esta invalida!",
                statusCode: 401 // NÃO AUTORIZADO - OPCIONAL
                })
            }
    // 3 PASSO GERAR O TOKEN  SE A SENHA, 2 PASSO, ESTIVER CORRETA
    // jwt.sign(nome do usuário, SEGREDO)
    const token = jwt.sign({name: user.name}, SECRET);
            console.log("O TOKEN EH ESSE AKI", token)
            
            res.status(200).send({
                message: "Amor, vc esta logadah",
                token // DEVOLVER/MOSTRAR O TOKEN AO USUARIO
            })
        })
    } catch(err) {
        console.error(err)
    }
};

module.exports = {
    login
};