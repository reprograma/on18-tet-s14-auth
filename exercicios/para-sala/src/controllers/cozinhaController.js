const mongoose = require("mongoose");
const CozinhaSchema = require("../models/CozinhaSchema");

const buscarTodasCozinhas = async (request, response) => {
    try {
        const cozinha = await CozinhaSchema.find()
        if (cozinha.length == 0) {
            return response.status(200).json({ message: `hummm, Não há cozinha cadastrada até o momento.` })
        }
        response.status(200).json(cozinha)
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

const buscarCozinhaId = async (request, response) => {
    const { id } = request.params
    try {
        if (id.length < 24 || id.length > 24) {
            return response.status(404).json({
                message: `Por favor digite o id da cozinha corretamente, o mesmo possui 24 caracteres.`
            })
        }
        const cozinha = await CozinhaSchema.find({ id: id })
        if (cozinha.length == 0) {
            return response.status(200).json({ message: `A cozinha não encontrada.` })
        }
        response.status(200).json(cozinha)
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

const criarCozinha = async (request, response) => {
    const { id, nome, cnpj, iniciativa_privada,
        endereco: { cep, rua, numero, complemento, referencia, estado, cidade, bairro },
        bairros_atuantes, site, atividades_disponiveis, pessoa_responsavel } = request.body;

    const buscaBairro = await CozinhaSchema.find({ bairro: bairro })
   
    let ExisteBairro = buscaBairro.filter((cozinha) => cozinha.endereco.bairro === bairro)
   
    let nomeExisteBairro = ExisteBairro.find((cozinha) => cozinha.nome === nome)
    if (nomeExisteBairro) {
        return response.status(404).json({ message: `Não é possível cadastrar esta cozinha, esse nome já existe neste bairro` });
    }
    const buscaCnpj = await CozinhaSchema.find({ cnpj })
    if (buscaCnpj.length !== 0) {
        return response.status(400).json({ message: `Não é possível cadastrar,pois, esse número de cnpj já existe` });
    }
    try {
        const cozinha = new CozinhaSchema({
            id: id,
            nome: nome,
            cnpj: cnpj,
            iniciativa_privada: iniciativa_privada,
            endereco: {
                cep: cep,
                rua: rua,
                numero: numero,
                complemento: complemento,
                referencia: referencia,
                estado: estado,
                cidade: cidade,
                bairro: bairro
            },
            bairros_atuantes: bairros_atuantes,
            site: site,
            atividades_disponiveis: atividades_disponiveis,
            pessoa_responsavel: pessoa_responsavel
        })
        const salvarCozinha = await cozinha.save();
        response.status(201).json({
            cozinha: salvarCozinha
        })

    } catch (error) {
        response.status(400).json({
            message: error.message
        })

    }
}

const deletarCozinha = async (request, response) => {
    const { id } = request.params
    try {
        if (id.length < 24 || id.length > 24) {
            return response.status(404).json({ message: `Por favor digite o id da cozinha corretamente, o mesmo possui 24 caracteres.` })
        }
        const cozinhaEncontrada = await CozinhaSchema.deleteOne({ id: id })
        if (cozinhaEncontrada.deletedCount === 1) {
            return response.status(200).send({ message: `A cozinha foi deletada com sucesso!` })
        } else {
            return response.status(404).send({ message: "A cozinha não foi encontrada." })
        }
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

const atualizarCozinha = async (request, response) => {
    const { id } = request.params
    const { nome, cnpj, iniciativa_privada,
        endereco: { cep, rua, numero, complemento, referencia, estado, cidade, bairro },
        bairros_atuantes, site, atividades_disponiveis, pessoa_responsavel } = request.body;
    try {
        if (id.length < 24 || id.length > 24) {
            return response.status(404).json({
                message: `Por favor digite o id da cozinha corretamente, o mesmo possui 24 caracteres.`
            })
        }
        const cozinhaEncontrada = await CozinhaSchema.updateOne({
            nome, cnpj, iniciativa_privada,
            endereco: { cep, rua, numero, complemento, referencia, estado, cidade, bairro },
            bairros_atuantes, site, atividades_disponiveis, pessoa_responsavel
        })
        const cozinhaporId = await CozinhaSchema.find({ id: id })
        if (cozinhaporId.length == 0) {
            return response.status(404).json({
                message: `A cozinha não foi encontrada.`
            })
        }
        response.json({ cozinhaporId })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    buscarTodasCozinhas,
    buscarCozinhaId,
    criarCozinha,
    deletarCozinha,
    atualizarCozinha
}