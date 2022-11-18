const mongoose = require('mongoose');

const bibliotecaSchema = require("../models/BibliotecaModel");

const criarBiblioteca = async(req, res) => {
    const {nome, cnpj, telefone, iniciativa_privada, endereco, bairros_atuantes, site, atividades_disponiveis, responsavel } = req.body;
    try{
        const biblioteca = new bibliotecaSchema({
            nome: nome,
            cnpj: cnpj,
            telefone: telefone,
            iniciativa_privada: iniciativa_privada,
            endereco: endereco,
            bairros_atuantes: bairros_atuantes,
            site: site,
            atividades_disponiveis: atividades_disponiveis,
            responsavel: responsavel
        })
        const bibliotecaSalva = await biblioteca.save();
        res.status(201).json({
            biblioteca: bibliotecaSalva
        })

    }catch(error){
        res.status(400).json({
            message: error.message
        })
    }
}

const listarBibliotecas = async(req, response) => {
    //const {nome} = req.query;

    let query = { };

    //if (nome) query.nome = new RegExp(nome, 'i');

    try {
        const biblioteca = await bibliotecaSchema.find(query);
        response.status(200).json(biblioteca);

    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
}

const buscarBibliotecasPorID = async(req, res) => {
    const { id } = req.params;

    try {
        const bibliotecas = await bibliotecaSchema.find(req.params)

        const bibliotecaEncontrada = bibliotecas.find(bibliotecaAtual => {
            return bibliotecaAtual.id == id
        });

        res.status(200).send(bibliotecaEncontrada);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}

const atualizarBiblioteca = async(req, response) => {
    const { id } = req.params;

    try {
        const body = req.body;
        delete body.id;
        delete body._id;

        const biblioteca = await bibliotecaSchema.findByIdAndUpdate(id, body, {returnDocument:'after'});
        
        response.status(200).send(biblioteca)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}

const removerBiblioteca = async(req, res) => {
    const { id } = req.params;

    try {
        const bibliotecas = await bibliotecaSchema.findByIdAndDelete(id)

        if( !bibliotecas) {
            return res.status(404).send("Biblioteca não existente");    
        }
        res.status(200).send(bibliotecas);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        });
    }

}

module.exports = {
    criarBiblioteca,
    listarBibliotecas,
    buscarBibliotecasPorID,
    atualizarBiblioteca,
    removerBiblioteca
}
