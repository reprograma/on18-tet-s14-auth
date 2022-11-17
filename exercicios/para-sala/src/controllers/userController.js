const UserSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");

const getAll = async (req, res) => {
  UserSchema.find(function (err, users) {
    if(err) {
      res.status(500).send({ message: err.message })
    }
      res.status(200).send(users)
  }) 
};
const createUser = async (req, res) => {
  const hashedPassword = bcrypt.hashedSync(req.body.password, 10)  
  req.body.password = hashedPassword

    const emailExists = await UserSchema.exists({ email: req.body.email })

    if(!emailExists) { // verficar se ja existe para nao dar conflito.
      return res.status(409).send({
        message: "Email ja cadastrado!"
      })
    }
    try {
      const newUser = new UserSchema(req.body)
  
      const savedUser = await newUser.save()
  
      res.status(201).send({
        message: 'Oiiiiii, seu user foi criado com mto sucesso lacrou',
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
  getAll,
  createUser
};
