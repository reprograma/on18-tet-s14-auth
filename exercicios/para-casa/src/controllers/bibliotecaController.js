const mongoose = require("mongoose");
const config = require("../../config.json");
const Biblioteca = require("../models/bibliotecaModel");

const uri = `mongodb+srv://kathalice:${config.password}@ler-e-saber.bjinctf.mongodb.net/?retryWrites=true&w=majority`;

const tryCatchWrapper = (fn) => {
  return async function wrappedFn(req, res) {
    try {
      await fn(req, res);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
};

const get = async (req, res) => {
  mongoose.connect(uri);
  const result = await Biblioteca.find(req.query);
  res.status(200).send(result);
};

const getById = async (req, res) => {
  mongoose.connect(uri);
  const result = await Biblioteca.findById(req.params.id);
  res.status(200).send(result);
};

const post = async (req, res) => {
  mongoose.connect(uri);
  const newBiblioteca = new Biblioteca({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });

  newBiblioteca.save((err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else {
      res.status(201).send(newBiblioteca);
    }
  });
};

const deleteById = async (req, res) => {
  mongoose.connect(uri);
  const result = await Biblioteca.findByIdAndDelete(req.params.id);
  res.status(200).send({
    message: `Biblioteca ID: ${req.params.id} - Removed Successfully`,
    deleted: result,
  });
};

const patchById = async (req, res) => {
  mongoose.connect(uri);
  const result = await Biblioteca.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });
  const updatedResult = await Biblioteca.findById(req.params.id);
  res.status(200).send({
    message: `Biblioteca ID: ${req.params.id} - Updated Successfully`,
    before: result,
    after: updatedResult,
  });
};

module.exports = { tryCatchWrapper, get, post, getById, deleteById, patchById };
