const CozinhaSchema = require('../models/CozinhaSchema');

const criarCozinha = async (req, res) => {
    try {

        const { nome, cnpj, telefone, iniciativa_privada, endereco, bairros_atuantes,
            site, atividades_disponiveis, pessoa_responsavel } = req.body

        const buscarCnpj = await CozinhaSchema.find({ cnpj });

        //Regras de negócio: Não poderá existir cozinha com o mesmo cnpj;

        if (buscarCnpj.length !== 0) {
            return response.status(400).json({ Alerta: `CNPJ já existente` });
        }

        //Regra de negócio: Não aceitará CNPJ com menos de 14 caracteres;

        if (String(cnpj).length > 14) {
            return response.status(401).json({ Alerta: `Este CNPJ é inválido. Caracter a mais: ${Number(String(cnpj).length) - 14}` });
        } else if (String(cnpj).length < 14) {
            return response.status(401).json({ Alerta: `Este CNPJ é inválido. Caracter a menos: ${14 - Number(String(cnpj).length)}` });
        }

        //Regras de negócio: Não poderá existir cozinhas com o mesmo nome no mesmo bairro;
        
        const buscarBairro = await CozinhaSchema.find({ bairro })

        let checarBairro = buscarBairro.filter((cozinha) => cozinha.endereco.bairro === bairro)
        console.log(checarBairro)

        let nomeExisteBairro = existeBairro.find((cozinha) => cozinha.nome === nome)
        console.log(nomeExisteBairro)

        if (nomeExisteBairro) {
        return response.status(400).json({ Alerta: `O nome desta cozinha já existe neste bairro` });
    }
       
        const cozinha = new CozinhaSchema({
            id: id,
            nome: nome,
            cnpj: cnpj,
            iniciativa_privada: iniciativa_privada,
            endereco: endereco,
            bairros_atuantes: bairros_atuantes,
            site: site,
            atividades_disponiveis: atividades_disponiveis,
            pessoa_responsavel: pessoa_responsavel
        })
    

        const salvarCozinha = await cozinha.save();
        res.status(201).json({
            mensagem: `Sua cozinha foi criada! :D`
        })

        }catch(error){
        res.status(401).json({
            message: error.message
        })
    }
    }

    const buscarTodasCozinhas = async(req,res) => {
        try{
            const buscarCozinha = await CozinhaSchema.find();
            res.status(200).json(buscarCozinha)
        }catch(error){
            res.status(500).json({
                mensagem: error.message
            })
        }
    }

    const deletarCozinha = async(req, res) =>{
        try{
            const {id} = req.params;
            const deletarPorId = await CozinhaSchema.deleteone({id});

            res.status(200).jason({
                mensagem: `Cozinha excluída com sucesso!`
            })
        }catch(error){
            res.status(401).json({
                mensagem: error.message
            })
        }
    }

    module.exports = {
        criarCozinha,
        buscarTodasCozinhas,
        deletarCozinha
    }