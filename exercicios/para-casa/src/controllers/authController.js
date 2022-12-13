const UserSchema = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

const login = (req, res) => {
    try {

        UserSchema.findOne({ email: req.body.email }, (error, user) => {
            console.log("Esse é o usuário:", user)

            if (!user) {
                return res.status(404).send({
                    message: 'Usuário não encontrado',
                    email: `${req.body.email}`
                });
            }

            const validPassword = bcrypt.compareSync(req.body.password, user.password)

            if (!validPassword) {
                return res.status(401).send({
                    message: "Senha inválida.",
                    statusCode: 401
                })
            }

            const token = jwt.sign({ name: user.name }, SECRET);
            console.log("O token é esse:", token)

            res.status(200).send({
                message: "Login efetuado com sucesso!",
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