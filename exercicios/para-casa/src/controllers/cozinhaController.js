const CozinhaSchema = require("../models/cozinhaSchema")


const criarCozinha = async (request, response) => {

    try {
        
        const cozinhas = await CozinhaSchema.find()

        const { nome, cnpj, iniciativa_privada, endereco, estado, cidade, bairro, bairros_que_atuam, site, atividades_disponiveis, pessoa_responsavel } = request.body

        const cozinhaNova = new CozinhaSchema({
            nome: nome,
            cnpj: cnpj,
            iniciativa_privada: iniciativa_privada,
            endereco: endereco,
            estado: estado,
            cidade: cidade,
            bairro: bairro,
            bairros_que_atuam: bairros_que_atuam,
            site: site,
            atividades_disponiveis: atividades_disponiveis,
            pessoa_responsavel: pessoa_responsavel
        })

        for (const cozinha of cozinhas) {
            if (cozinha.nome === nome && cozinha.bairro === bairro)
                return response.status(409).json({
                    message: "Já existe uma cozinha com este nome neste bairro"
                })
        }

        for (const cozinha of cozinhas) {
            if (cozinha.cnpj === cozinhaNova.cnpj)
                return response.status(409).json({
                    message: "Já existe uma cozinha com este CNPJ"
                })
        }

        const salvarCozinha = await cozinhaNova.save()


        response.status(201).json({
            message: `Cozinha criada com sucesso ${salvarCozinha}`
        })

    } catch (error) {

        response.status(500).json({
            message: error.message
        })

    }


}





const buscarCozinhas = async (request, response) => {

    try {

        const cozinhas = await CozinhaSchema.find()

        response.status(200).json(cozinhas)

    } catch (error) {
        response.status(500).json({
            message: error.message
        })

    }

}

const encontrarCozinha = async (request, response) => {

    try {

        const cozinha = await CozinhaSchema.findById(request.params.id)

        response.status(200).send(cozinha)

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }


}

const atualizarCozinha = async (request, response) => {

    try {

        const cozinha = await CozinhaSchema.findById(request.params.id)

        cozinha.site = request.body.site || cozinha.site

        const cozinhaAtualizada = await cozinha.save()

        response.status(200).json({
            message: "Cozinha atualizada com sucesso!"
        })

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }



}

const deletarCozinha = async (request, response) => {
    try {
        const cozinha = await CozinhaSchema.findById(request.params.id)

        cozinha.delete()

        response.status(200).json({
            message: "Cozinha deletada com sucesso"
        })

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    criarCozinha,
    buscarCozinhas,
    encontrarCozinha,
    deletarCozinha,
    atualizarCozinha
}