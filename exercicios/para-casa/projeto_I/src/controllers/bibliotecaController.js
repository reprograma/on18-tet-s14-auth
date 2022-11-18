const { default: mongoose } = require("mongoose")
const { request, response } = require("../app")
const bibliotecaSchema = require("../models/biblioteca\bibliotecaSchema")


const criarUsuario = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    const emailExists = await UserSchema.exists({
        email: req.body.email
    })

    if (emailExists) {
        return res.status(409).send({
            message: 'Esse email já está cadastrado!',
        })
    }

    try {
        const newUser = new UserSchema(req.body)

        const savedUser = await newUser.save()

        res.status(201).send({
            message: 'Usuário cadastrado!',
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
            res.status(500).send({
                message: err.message
            })
        }
        res.status(200).send(users)
    })
}

const buscarTodasBibliotecas = async (request, response) => {
    try {

        const biblioteca = await bibliotecaSchema.find()

        if (biblioteca.length > 1) {
            return response.status(200).json({message: `Encontramos ${biblioteca.length} biblioteca.`, biblioteca})
        } else if (biblioteca.length === 1) {
            return response.status(200).json({message: `Encontramos ${biblioteca.length} biblioteca.`, biblioteca})
        } else {
            return response.status(404).json({message: `Nenhuma biblioteca está cadastrada até agora`})
        }
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

const buscarBibliotecaId = async (request, response) => {
    const {
        id 
    } = request.params

    try {
        if (id.length < 24 || id.length > 24) {
            return response.status(404).json({
                message: `Por favor digite o id da Biblioteca corretamente, o mesmo possui 24 caracteres.`
            })
        }
        const biblioteca = await bibliotecaSchema.find({
            id
        })
        if (biblioteca.length == 0) {
            return response.status(200).json({
                message: `Biblioteca não encontrada`
            })
        }
        response.status(500).json({
            message: error.message
        })
    }

}

const criarBiblioteca = async (request, response) => {
    const {
        id,
        nome,
        cnpj,
        endereço: {
            cep,
            rua,
            numero,
            complemento,
            referencia,
            estado, 
            cidade,
            bairro
        }
        
    }= request.body;

    const buscarBairro = await bibliotecaSchema.find({
        bairro
    })
    let existeBairro = buscarBairro.filter((biblioteca) => biblioteca.endereço.bairro === bairro)

    let nomeExisteBairro = existeBairro.find((biblioteca) => biblioteca.nome === nome)

    if (nomeExisteBairro) {
        return response.status(404).json({
            message: `Não foi possivel cadastrar essa biblioteca pois ja é existente no bairro`
        });

    }

    const buscarCnpj = await bibliotecaSchema.find({
        cnpj
    })

    if (buscarCnpj.length !== 0) {
        return response.status(400).json({
            message: `Não foi possivel cadastrar, esse número de cnpj já existe`
        });
    }

    try {
        const cozinha = new bibliotecaSchema({
            id: id,
            nome: nome,
            cnpj: cnpj,
            endereço: {
                cep: cep,
                rua: rua,
                numero: numero,
                complemento: complemento,
                estado: estado, 
                cidade: cidade,
                bairro: bairro
            }
        })

        const salvarBiblioteca = await biblioteca.save();
        response.status(201).json({
            message: error.message
        })

    }


}

const deletarBiblioteca = async (request, response) => {
    const {
        id
    } = request.params

    const bibliotecaEncontrada = await bibliotecaSchema.deleteOne ({
        id
    })
    if (bibliotecaEncontrada.deletedCount === 1) {
        return response.status(200).send({
            message: `A biblioteca foi deletada com sucesso!!!!`
        })

    } else {
        return response.status(404).send({
            message: `Biblioteca não encontrada`
        })
    }
} catch (error) {
    response.status(500).json({
        message: error.message
    })
}

const atualizarBiblioteca = async (request, response) => {
    const {
        id
    } = request.params
    const {
        nome,
        endereço: {
            cep,
            rua,
            numero,
            complemento,
            referencia,
            estado,
            cidade,
            bairro
        }
    } = request.body;

    const bibliotecaEncontrada = await bibliotecaSchema.updateOne({
        nome,
        endereço: {
            cep,
            rua,
            numero,
            complemento,
            referencia,
            estado,
            cidade,
            bairro
        }
    })
    const BibliotecaId = await bibliotecaSchema.find({
        id
    })

    if (bibliotecaId.length === 0) {
        return response.status(404).json({
            message: `A biblioteca não foi encontrada`
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    buscarTodasBibliotecas,
    buscarBibliotecaId,
    criarBiblioteca,
    deletarBibliotexa,
    atualizarBiblioteca
}

