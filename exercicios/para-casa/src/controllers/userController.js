const mongoose = require("mongoose");
const config = require("../../config.json");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv-safe").config();

const uri = `mongodb+srv://kathalice:${config.password}@ler-e-saber.bjinctf.mongodb.net/?retryWrites=true&w=majority`;

const createUser = async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  const newUser = new User.userSchema(req.body);

  const savedUser = await newUser.save();

  res.status(200).json({
    message: "User added successfully!",
    savedUser,
  });
};

const loginUser = async (req, res) => {
  try {
    User.userSchema.findOne({ username: req.body.username });
  } catch (err) {
    return res.status(401).send({
      message: "User not found!",
      username: req.body.username,
    });
  }
  const validPassword = bcrypt.compareSync(req.body.password, user.password);
  if (!validPassword) {
    return res.status(401).send({
      message: "Unauthorized login!",
    });
  }
  const token = jwt.sign({ username: req.body.username }, process.env.SECRET);
  res.status(200).send({
    message: "Authorized login!",
    token,
  });
};

const getAll = async (req, res) => {
  const authHeader = req.get("authorization");
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Header error!");
  }

  User.userSchema.find(function (err, users) {
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res.status(200).send(users);
  });
};

module.exports = { createUser, loginUser, getAll };
