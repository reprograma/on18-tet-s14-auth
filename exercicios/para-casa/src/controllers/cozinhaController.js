const mongoose = require("mongoose");
const UserSchema = require("../models/UserSchema");
const CozinhaSchema = require("../models/CozinhaSchema");
const bcrypt = require('bcrypt');


const criarUsuario = async (request, response) => {
    const { email } = request.body;
    const hashedPassword = bcrypt.hashSync(request.body.password, 10)
    request.body.password = hashedPassword

    //verifica se o email já está cadastrado
    const emailExiste = await UserSchema.exists({
        email: request.body.email
    })
    if (emailExiste) {
        return response.status(409).send({
            message: 'Esse email já foi cadastrado!',
        })
    }

    // //verifica se o email possui @
    // const verificaArroba = email.indexOf('@')
    // if (verificaArroba == -1) {
    //     return response.status(401).send({
    //         message: 'O endereço de email está inválido. Caracter a menos: arroba [ @ ]',
    //     })
    // }

    // //verifica se o email possui ponto após o ARROBA
    // const verificaPonto = email.includes(".", verificaArroba);
    // if (!verificaPonto) {
    //     return response.status(401).send({
    //         message: 'O endereço de email está inválido. Caracter a menos: ponto [ . ]'
    //     })
    // }

    //verifica se o email possui caracter depois do PONTO + 2 de cima
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
        return response.status(401).send({
            message: 'Email inválido!',
        })
    }

    try {
        const novoUsuario = new UserSchema(request.body)
        const salvarUsuario = await novoUsuario.save()
        response.status(201).send({
            message: 'Usuário cadastrado com sucesso!',
            salvarUsuario,
        })
    } catch (err) {
        response.status(500).send({
            message: err.message,
        })
    }
}

const getAll = async (req, res) => {
    UserSchema.find(function (err, users) {
        if (err) {
            res.status(500).send({
                message: err.message
            })
        }
        res.status(200).send(users)
    })
}

const buscarTodasCozinhas = async (request, response) => {
    try {

        const cozinha = await CozinhaSchema.find()

        if (cozinha.length > 1) {
            return response.status(200).json({ Prezades: `Encontramos ${cozinha.length} cozinhas.`, cozinha })
        } else if (cozinha.length == 1) {
            return response.status(200).json({ Prezades: `Encontramos ${cozinha.length} cozinha.`, cozinha })
        } else {
            return response.status(404).json({ Prezades: `Nenhuma cozinha foi encontrada.` })
        }

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

const buscarCozinhaId = async (request, response) => {

    const { id } = request.params

    try {
        //Regras de negócio: Não aceitará id com menos de 24 caracteres
        if (id.length > 24) {
            return response.status(401).json({
                Alerta: `Id incorreto. Caracter a mais: ${id.length - 24}.`
            })
        } else if (id.length < 24) {
            return response.status(401).json({
                Alerta: `Id incorreto. Caracter a menos: ${24 - id.length}.`
            })
        }

        const cozinha = await CozinhaSchema.find({ id })
        if (cozinha.length == 0) {
            return response.status(404).json({ Prezades: `A cozinha não foi encontrada.` })
        }
        response.status(200).json({ Prezades: `Segue a cozinha para este id [${id}]:`, cozinha })

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

    //Regras de negócio: Respeitar o tipo de dado e preenchimento obrigatório;
    if (typeof (nome) !== 'string' || nome.trim() === "") {
        return response.status(400).send({ Alerta: `A string nome é obrigatória` })
    } else if (typeof (cnpj) !== 'number') {
        return response.status(400).send({ Alerta: `O número do CNPJ é obrigatório` })
    } else if (typeof (iniciativa_privada) !== 'boolean') {
        return response.status(400).send({ Alerta: `Responda com true ou false` })
    } else if (typeof (cep) !== 'string' || cep.trim() === "") {
        return response.status(400).send({ Alerta: `O número do CEP é obrigatório` })
    } else if (typeof (rua) !== 'string' || rua.trim() === "") {
        return response.status(400).send({ Alerta: `A string rua é obrigatória` })
    } else if (typeof (numero) !== 'number') {
        return response.status(400).send({ Alerta: `O número da residência é obrigatório` })
    } else if (typeof (complemento) !== 'string' || complemento.trim() === "") {
        return response.status(400).send({ Alerta: `O complemento deve ser uma string` })
    } else if (typeof (referencia) !== 'string' || referencia.trim() === "") {
        return response.status(400).send({ Alerta: `A referência deve ser uma string` })
    } else if (typeof (estado) !== 'string' || estado.trim() === "") {
        return response.status(400).send({ Alerta: `A string estado é obrigatória` })
    } else if (typeof (cidade) !== 'string' || cidade.trim() === "") {
        return response.status(400).send({ Alerta: `A string cidade é obrigatória` })
    } else if (typeof (bairro) !== 'string' || bairro.trim() === "") {
        return response.status(400).send({ Alerta: `A string bairro é obrigatória` })
    } else if (typeof (site) !== 'string' || site.trim() === "") {
        return response.status(400).send({ Alerta: `O site deve ser uma string` })
    } else if (typeof (pessoa_responsavel) !== 'string' || pessoa_responsavel.trim() === "") {
        return response.status(400).send({ Alerta: `A string da pessoa responsável pela cozinha é obrigatória` })
    }

    //Regras de negócio: Não poderá existir cozinhas com o mesmo nome no mesmo bairro;
    const buscaBairro = await CozinhaSchema.find({ bairro })
    let existeBairro = buscaBairro.filter((cozinha) => cozinha.endereco.bairro === bairro)
    let nomeExisteBairro = existeBairro.find((cozinha) => cozinha.nome === nome)
    if (nomeExisteBairro) {
        return response.status(400).json({ Prezades: `O nome desta cozinha já existe neste bairro` });
    }

    //Regras de negócio: Não poderá existir cozinhas com o mesmo cnpj;
    const buscaCnpj = await CozinhaSchema.find({ cnpj })
    if (buscaCnpj.length !== 0) {
        return response.status(400).json({ Prezades: `Este número de CNPJ já existe no nosso banco de dados` });
    }

    //Regras de negócio: Não aceitará CNPJ com menos de 14 caracteres;
    if (String(cnpj).length > 14) {
        return response.status(401).json({ Alerta: `Este CNPJ é inválido. Caracter a mais: ${Number(String(cnpj).length) - 14}` });
    } else if (String(cnpj).length < 14) {
        return response.status(401).json({ Alerta: `Este CNPJ é inválido. Caracter a menos: ${14 - Number(String(cnpj).length)}` });
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
        response.status(500).json({
            message: error.message
        })
    }
}

const deletarCozinha = async (request, response) => {

    const { id } = request.params

    try {
        //Regras de negócio: Não aceitará id com menos de 24 caracteres
        if (id.length > 24) {
            return response.status(401).json({
                Alerta: `Id incorreto. Caracter a mais: ${id.length - 24}.`
            })
        } else if (id.length < 24) {
            return response.status(401).json({
                Alerta: `Id incorreto. Caracter a menos: ${24 - id.length}.`
            })
        }

        const cozinhaEncontrada = await CozinhaSchema.deleteOne({ id })
        if (cozinhaEncontrada.deletedCount === 1) {
            return response.status(200).send({ Prezades: `A cozinha foi deletada com sucesso!` })
        } else {
            return response.status(404).send({ Prezades: "A cozinha não foi encontrada." })
        }

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

const atualizarCozinha = async (request, response) => {

    const { id } = request.params

    //Regras de negócio: Não aceitará id com menos de 24 caracteres
    if (id.length > 24) {
        return response.status(401).json({
            Alerta: `Id incorreto. Caracter a mais: ${id.length - 24}.`
        })
    } else if (id.length < 24) {
        return response.status(401).json({
            Alerta: `Id incorreto. Caracter a menos: ${24 - id.length}.`
        })
    }

    //Regras de negócio: Não pode atualizar o CNPJ;
    const { nome, iniciativa_privada,
        endereco: { cep, rua, numero, complemento, referencia, estado, cidade, bairro },
        bairros_atuantes, site, atividades_disponiveis, pessoa_responsavel } = request.body;

    //Regras de negócio: Respeitar o tipo de dado e preenchimento obrigatório;

    if (typeof (nome) !== 'string' || nome.trim() === "") {
        return response.status(400).send({ Alerta: `O nome deve ser uma string` })
    } else if (typeof (iniciativa_privada) !== 'boolean') {
        return response.status(400).send({ Alerta: `Responda com true ou false` })
    } else if (typeof (cep) !== 'string' || cep.trim() === "") {
        return response.status(400).send({ Alerta: `O número do CEP deve ser uma string` })
    } else if (typeof (rua) !== 'string' || rua.trim() === "") {
        return response.status(400).send({ Alerta: `A rua deve ser uma string` })
    } else if (typeof (numero) !== 'number') {
        return response.status(400).send({ Alerta: `Preencha o número da residência ` })
    } else if (typeof (complemento) !== 'string' || complemento.trim() === "") {
        return response.status(400).send({ Alerta: `O complemento deve ser uma string` })
    } else if (typeof (referencia) !== 'string' || referencia.trim() === "") {
        return response.status(400).send({ Alerta: `A referência deve ser uma string` })
    } else if (typeof (estado) !== 'string' || estado.trim() === "") {
        return response.status(400).send({ Alerta: `O estado deve ser uma string` })
    } else if (typeof (cidade) !== 'string' || cidade.trim() === "") {
        return response.status(400).send({ Alerta: `A cidade deve ser uma string` })
    } else if (typeof (bairro) !== 'string' || bairro.trim() === "") {
        return response.status(400).send({ Alerta: `O bairro deve ser uma string` })
    } else if (typeof (site) !== 'string' || site.trim() === "") {
        return response.status(400).send({ Alerta: `O site deve ser uma string` })
    } else if (typeof (pessoa_responsavel) !== 'string' || pessoa_responsavel.trim() === "") {
        return response.status(400).send({ Alerta: `A pessoa responsável pela cozinha deve ser uma string` })
    }

    try {

        const cozinhaEncontrada = await CozinhaSchema.updateOne({
            nome, iniciativa_privada,
            endereco: { cep, rua, numero, complemento, referencia, estado, cidade, bairro },
            bairros_atuantes, site, atividades_disponiveis, pessoa_responsavel
        })

        const cozinhaAtualizadaId = await CozinhaSchema.find({ id })
        if (cozinhaAtualizadaId.length == 0) {
            return response.status(404).json({
                Prezades: `A cozinha não foi encontrada.`
            })
        }
        response.status(200).json({ Prezades: `Confira o seu cadastro atualizado:`, cozinhaAtualizadaId })

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

module.exports = {
    buscarTodasCozinhas,
    buscarCozinhaId,
    criarCozinha,
    deletarCozinha,
    atualizarCozinha,
    criarUsuario,
    getAll
}