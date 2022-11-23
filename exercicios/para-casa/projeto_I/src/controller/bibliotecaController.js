const mongoose = require("mongoose");

const BibliotecaSchema = require("../models/BibliotecaSchema");

const criarBiblioteca = async (req, res) => {
            
    try {

        const {
            nome,
            cnpj,
            telefone,
            iniciativa_privada,
            endereco,
            bairros_atuantes, 
            site, 
            atividades_disponiveis, 
            responsavel
        } = req.body
    
        const verificaCnpj = await BibliotecaSchema.find({cnpj})
        // console.log(cnpj)
        if (verificaCnpj.length !== 0){
            return res.status(409).json({mensagem:"Esse CNPJ já existe em nossos registros."})
        }

        // const buscarBairro = await BibliotecaSchema.find({bairro})
        // const buscarNome = await BibliotecaSchema.find({ nome })
        // if(buscarBairro && buscarNome){
        //     return res.status(400).json({mensgagem:"O nome desta biblioteca já existe nesse bairro"})
        // }
        
        
        const biblioteca = new BibliotecaSchema({
            nome:nome,
            cnpj: cnpj,
            telefone: telefone,
            iniciativa_privada: iniciativa_privada,
            endereco: endereco,
            bairros_atuantes: bairros_atuantes,
            site: site,
            atividades_disponiveis: atividades_disponiveis,
            responsavel: responsavel        
        })
  
            
        const salvarBiblioteca = await biblioteca.save();

        res.status(201).json({
            biblioteca: salvarBiblioteca,
            mensagem: "biblioteca cadastrada com sucesso"
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

const getBiblioteca = async (req, res) => {    
    try {
       const biblioteca = await BibliotecaSchema.find()
        
        res.status(200).json(biblioteca)


    } catch (error) {
        res.status(500).json({
            mensagem: error.message
        })
    }
}

const getById = async (req, res) => {
    try {
        const biblioteca = await BibliotecaSchema.findById(req.params.id)
        res.status(200).json(biblioteca);

    } catch (error) {
        res.status(500).json({
            mensagem: error.message
        })
    }
}

const deleteById = async (req,res) => {
    try {
        const biblioteca = await BibliotecaSchema.findById(req.params.id)

        await biblioteca.delete()

        res.status(200).json({
            mensagem: "Biblioteca removida do sistema"
        })

    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
}

const atualizaTelefone = async (req, res) => {
    const {nome,
        cnpj,
        telefone,
        iniciativa_privada,
        endereco,
        bairros_atuantes, 
        site, 
        atividades_disponiveis, 
        responsavel} = req.body
    
        const {id} = req.params
    
    try {              
        const biblioteca = await BibliotecaSchema.findOneAndUpdate({id},{
            nome, 
            cnpj, 
            telefone, 
            iniciativa_privada, 
            endereco, 
            bairros_atuantes,
            site, 
            atividades_disponiveis, 
            responsavel
        })
        
        
        await biblioteca.save()

        res.status(200).json({mensagem:"Cadastro atualizado com sucesso"})

    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
}

module.exports = {
    criarBiblioteca,
    getBiblioteca,
    getById,
    deleteById,
    atualizaTelefone

}

