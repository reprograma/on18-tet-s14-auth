const mongoose = require('mongoose');
const UserSchema = require('../models/userSchema')
const bcrypt = require("bcrypt");

const bibliotecaSchema = require("../models/BibliotecaSchema");

const criarBiblioteca = async(require, response) => {
    const {nome, cnpj, telefone, iniciativa_privada, endereco, bairros_atuantes,site,atividades_disponiveis, responsavel} = require.body;
    try{
        const biblioteca = new bibliotecaSchema({
            nome: nome,
            cnpj: cnpj,
            telefone: telefone,
            iniciativa_privada: iniciativa_privada,
            endereco: endereco,
            bairros_atuantes: bairros_atuantes,
            site:site,
            atividades_disponiveis: atividades_disponiveis,
            responsavel:responsavel
        })
        
        const salvarBiblioteca = await biblioteca.save();
        response.status(201).json({
            biblioteca: salvarBiblioteca
        })

    }catch(error){
        response.status(400).json({
            message: error.message
        })
    }
}

const buscarBibliotecas = async(require, response) => {
    const {nome} = require.query;

    let query = { };

    if (nome) query.nome = new RegExp(nome, 'i');

    try {
        const biblioteca = await bibliotecaSchema.find(query);
        response.status(200).json(biblioteca)

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

const obterBibliotecaPorId = async (request, response) => {
    const { id } = request.params
    try {
        if(id.length > 24 || id.length > 24) {
            response.status(404).json({
                message:`Número de ID incorreto, por favor, digite novamente!`
            })
        }

        const biblioteca = await bibliotecaSchema.findOne({ id })
        if (biblioteca.length == 0){
            response.status(200).json({message:`Biblioteca não encontrada`})
        }
        response.status(200).json({biblioteca});

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

const atualizarBiblioteca = async (request, response) => {
    const { id } = request.params
   
    const {nome, cnpj, telefone, iniciativa_privada, endereco:{cep, rua, numero, complemento, referencia, estado, cidade, bairro },
    bairros_atuantes,site,atividades_disponiveis, responsavel} = request.body;
    
    try{
        if(id.length > 24 || id.length > 24) {
            response.status(404).json({
                message:`Número de ID incorreto, por favor, digite novamente!`
            })
        }

        if (String(cnpj).length > 14 || String(cnpj).length < 14){
            response.status(404).json({
                message:`cnpj inválido, digite novamente.`
            })
        }

        const bibliotecaEncontrada = await bibliotecaSchema.updateOne({ 
            nome, cnpj,telefone, iniciativa_privada, 
            endereco: {cep, rua,numero, complemento, referencia, estado, cidade, bairro},
            bairros_atuantes, site, atividades_disponiveis, responsavel
        })
        const bibliotecaAtualizado = await bibliotecaSchema.find({ id })
            if(bibliotecaAtualizado.length == 0 ) {
                response.status(404).json({
                    message:`Biblioteca não encontrada!`
                })
            }
     
        response.status(200).json(bibliotecaAtualizado)

   } catch (error){
        response.status(400).json({
            message: error.message
      })
   }
}

const deletarBiblioteca = async(req, res) =>{
    try{
        const biblioteca = await bibliotecaSchema.findById(req.params.id)

        await biblioteca.delete();

        res.status(200).json({
            mensagem: `Biblioteca removida do banco de dados.`
        })
    }catch(error){
        res.status(400).json({
            mensagem: error.message
        })
    }
}

const createUser = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
  
    const emailExists = await UserSchema.exists({ email: req.body.email })
  
    if (emailExists) {
      return res.status(409).send({
        message: 'Email já cadastrado, CONFLITOUUUU',
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

  const getAll = async (req, res) => {
    UserSchema.find(function (err, users) {
      if (err) {
        res.status(500).send({ message: err.message })
      }
      res.status(200).send(users)
    })
  }
 

module.exports = {
    criarBiblioteca,
    buscarBibliotecas,
    obterBibliotecaPorId,
    atualizarBiblioteca,
    deletarBiblioteca,
    createUser,
    getAll
}