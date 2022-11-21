const UserSchema = require('../models/userSchema')
const bcrypt = require("bcrypt");



const criarUsuario = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)

    req.body.password = hashedPassword
  
    const emailExists = await UserSchema.exists({ email: req.body.email })
  
    if (emailExists) {
      return res.status(409).send({
        message: 'Email já cadastrado!',
      })
    }
  
    try {
      const newUser = new UserSchema(req.body)
  
      const savedUser = await newUser.save()
  
      res.status(201).send({
        message: 'Cadastrado com sucesso!',
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
    criarUsuario,
  }