const mongoose = require("mongoose");
const CozinhaSchema = require("../models/CozinhaSchema");
const bcrypt = require("bcrypt");


const buscarTodasCozinhas = async(req, res) => {
    try {
        const buscarCozinhas = await CozinhaSchema.find()
        res.status(200).json(buscarCozinhas)

    } catch (error) {
        res.status(500).json({
            mensagem: error.message
        })
    } 
}


const buscarCozinhaPorId = async(req, res) => {
    try {
       const { id } = req.params

       let encontrarCozinha = await CozinhaSchema.findById(id)
       
       if(encontrarCozinha == undefined) throw new Error("id não encontrado")
       
       res.status(200).send(encontrarCozinha)

    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


const cadastrarCozinha = async (req, res) => {
    try {

        const { nome, cnpj, telefone, iniciativa_privada, 
        endereco, bairros_atuantes, site, atividades_disponiveis, pessoa_responsavel } = req.body
            
        const buscarCnpj = await CozinhaSchema.find({ cnpj })
            //console.log("Esse aqui é buscar", buscarCnpj)
           
        let checarCnpj = buscarCnpj.find((cozinha) => cozinha.cnpj == cnpj)
            //console.log("Esse aqui é checar", checarCnpj)
            
            if(checarCnpj){
                return res.status(409).json({
                    mensagem: "Esse Cnpj já existe"
                })
            }
            
        let buscarBairro = await CozinhaSchema.find({ endereco })

        let bairroExiste = buscarBairro.filter((cozinha) => cozinha.endereco.bairro === endereco.bairro) 

        let existeNomeCozinha = bairroExiste.find((cozinha) => cozinha.nome === nome)
        
        if(existeNomeCozinha){
                return res.status(409).json({
                    mensagem: "Já existe uma cozinha com esse nome neste bairro"
                })
            }

        const cozinha = new CozinhaSchema({
            nome: nome, 
            cnpj: cnpj, 
            telefone: telefone, 
            iniciativa_privada: iniciativa_privada, 
            endereco: endereco, 
            bairros_atuantes: bairros_atuantes, 
            site: site, 
            atividades_disponiveis: atividades_disponiveis, 
            pessoa_responsavel: pessoa_responsavel
        })

        const salvarCozinha = await cozinha.save();
        res.status(201).json({
            "mensagem": "Cozinha cadastrada com sucesso!",
            cozinha: salvarCozinha
        })

    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
}


const deletarCozinha = async(req, res) => {
    try {
        const { id } = req.params

        const cozinha = await CozinhaSchema.findById(id)

        const deletarCozinha = await cozinha.delete()

        res.status(200).json({
            "mensagem": "Cozinha removida do sistema!"
        })
    } catch (error) {
        res.status(401).json({
            mensagem: error.message
        })
    }
}


const atualizarCozinha = async(req, res) => {
    try {
        const { id } = req.params
        
        const { nome, cnpj, telefone, iniciativa_privada,
        endereco, bairros_atuantes, site, atividades_disponiveis, pessoa_responsavel } = req.body

        const procurarCozinha = await CozinhaSchema.findById(id)

        procurarCozinha.nome = nome || procurarCozinha.nome
        procurarCozinha.cnpj = cnpj || procurarCozinha.cnpj
        procurarCozinha.telefone = telefone || procurarCozinha.telefone
        procurarCozinha.iniciativa_privada = iniciativa_privada || procurarCozinha.iniciativa_privada
        procurarCozinha.endereco = endereco || procurarCozinha.endereco
        procurarCozinha.bairros_atuantes = bairros_atuantes || procurarCozinha.bairros_atuantes
        procurarCozinha.site = site || procurarCozinha.site
        procurarCozinha.atividades_disponiveis = atividades_disponiveis || procurarCozinha.atividades_disponiveis
        procurarCozinha.pessoa_responsavel = pessoa_responsavel || procurarCozinha.pessoa_responsavel

        const cozinhaAtualizada = procurarCozinha.save()
        
        res.status(200).json({
            mensagem: "Cozinha atualiada!",
            cozinhaAtualizada
        })
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
    
}


module.exports = {
    buscarTodasCozinhas,
    buscarCozinhaPorId,
    cadastrarCozinha,
    deletarCozinha,
    atualizarCozinha
}
