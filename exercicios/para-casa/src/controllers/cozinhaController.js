const CozinhaSchema = require("../models/cozinhaSchema")
const bcrypt = require("bcrypt")


const catalogoDeCozinhas = async (request, response) => {

    try {

        const cozinhas = await CozinhaSchema.find()
        response.status(200).send(cozinhas)

    } catch (error) {
        response.status(500).send({
            message: error.message
        })
    }
}

const criarCozinha = async (request, response) => {

    const cozinhas = await CozinhaSchema.find()

    let { nome, cnpj, email, senha, iniciativa_privada, endereco, estado, cidade, bairro, bairros_que_atuam, site, atividades_disponiveis, pessoa_responsavel } = request.body

    if (!nome || nome.trim() === "") {
        return response.status(400).send({
            message: "Nome não foi preenchido"
        })
    }

    if (!email || email.trim() === "") {
        return response.status(400).send({
            message: "Email não foi preenchido"
        })
    }

    let hashedSenha = bcrypt.hashSync(senha, 10)
    senha = hashedSenha


    const verificaSeEmailExiste = await CozinhaSchema.exists({ email: email })
    const verificaSeCnpjExiste = await CozinhaSchema.exists({ cnpj: cnpj })

    if (verificaSeEmailExiste) {
        return response.status(409).send({
            message: "Esse email já existe!"
        })
    }

    if (verificaSeCnpjExiste) {
        return response.status(409).send({
            message: "Esse CNPJ já está cadastrado"
        })
    }

    for (const cozinha of cozinhas) {
        if (cozinha.nome === nome && cozinha.bairro === bairro) {
            return response.status(409).send({
                message: "Já existe uma cozinha com este nome neste bairro!"
            })
        }
    }

    try {

        const cozinhaNova = new CozinhaSchema({
            nome: nome,
            cnpj: cnpj,
            email: email,
            senha: senha,
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

        const cadastrarCozinha = await cozinhaNova.save()

        response.status(201).send({
            message: "Cozinha cadastrada com sucesso!",
            cadastrarCozinha
        })

    } catch (error) {

        response.status(500).send({
            message: error.message
        })
    }


}

const atualizarCozinha = async (request, response) => {

    try {
        CozinhaSchema.findByIdAndUpdate(request.params.id, request.body, function (err, cozinhaAtualizada) {
            if (err) {
                response.status(500).send({
                    message: err.message
                })
            }

            response.status(200).send({
                message: "Cozinha atualizada!"
            })
        })
    } catch (error) {
        
        response.status(500).send({
            message: error.message
        })
    }






}




const deletarCozinha = async (request, response) => {


    const acharCozinha = await CozinhaSchema.findById(request.params.id)

    try {

        acharCozinha.delete()

        response.status(200).send({
            message: "Cadastro deletado com sucesso!"
        })

    } catch (error) {
        response.status(500).send({
            message: error.message
        })

    }



}

module.exports = {
    criarCozinha,
    catalogoDeCozinhas,
    atualizarCozinha,
    deletarCozinha
}