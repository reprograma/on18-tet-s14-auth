const UserSchema = require('../models/UserSchema'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

const SECRET = process.env.SECRET;

const login = (req, res) => {
    try {
        
        UserSchema.findOne({ email: req.body.email }, (error, user) => {
            if(!user) {
                return res.status(404).send({
                    message: 'Usuário não encontrado',
                    email: `${req.body.email}`
                });
            }
            
            const validPassword = bcrypt.compareSync(req.body.password, user.password)
            
            if(!validPassword) {
                return res.status(401).send({
                message: "Senha digitada inválida",
                statusCode: 401
                })
            }
            
            const token = jwt.sign({name: user.name}, SECRET);
            
            res.status(200).send({
                message: "Login feito com sucesso",
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