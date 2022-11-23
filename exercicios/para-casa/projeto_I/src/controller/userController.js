const userSchema = require('../models/userSchema')
const bcrypt = require("bcrypt")

const createUser = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    const emailExists = await userSchema.exists({email: req.body.email})
    if(emailExists) {
        return res.status(409).send({
            message: 'Email já consta em nosso cadastro',
        })
    }

    try {

        const newUser = new userSchema(req.body)

        const savedUser = await newUser.save()
        console.log(savedUser)

        res.status(201).send({
            message: 'Usuário cadastrado com sucesso',
            savedUser,
        })
        
    } catch (err) {
        console.error(err)
        res.status(500).send({
            message: err.message,
        })
        
    }

}

module.exports = {
    createUser
}