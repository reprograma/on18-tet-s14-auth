const { default: mongoose } = require("mongoose")
const bibliotecaSchema = require("../models/bibliotecaModels")

const criarBiblioteca = async (req, res) => {
    
    //Regra de Negócio : Não pode repetir bairro nem CNPJ.
    const {nome,cnpj,telefone,iniciativa_privada,
        endereco,bairros_atuantes,site,atividades_disponiveis,pessoa_responsavel} = req.body

   // const{bairro,cnpj}=req.body
    const buscaBairro = await bibliotecaSchema.find({ nome }) 
    const buscaCnpj = await bibliotecaSchema.find({ cnpj }) 
    
    if(buscaBairro.length !== 0 ){
        return res.status(400).json({
            message :  `Desculpe,mas nesse bairro já existe uma biblioteca cadastrada. `
        })
    }
    if(buscaCnpj.length !== 0){
        return res.status(400).json({
            message :  `Essa biblioteca(CNPJ) já está cadastrada. `
        })
    }
    
    try {
        const biblioteca = new bibliotecaSchema({
            nome: nome,
            cnpj: cnpj,
            telefone: telefone,
            iniciativa_privada: iniciativa_privada,
            endereco:endereco,
            bairros_atuantes: bairros_atuantes,
            site: site,
            atividades_disponiveis: atividades_disponiveis,
            pessoa_responsavel: pessoa_responsavel
        })

        const salvarBiblioteca = await biblioteca.save()
        res.status(201).json({
           // message: `Biblioteca cadastrada com sucesso`,
            biblioteca: salvarBiblioteca
        })


    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

// GET "/biblioteca" Deverá retornar todas as bibliotecas cadastradas.
const buscarBiblioteca = async(req,res) =>{
   
    const {nome} = req.query
    let query = {}
    if (nome) query.nome = new RegExp(nome,'i')

    try {
    
        const biblioteca = await bibliotecaSchema.find(query) 
         
          res.status(200).json(biblioteca)         
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
       
    }
} 


const buscarBibliotecaPorId = async(req,res) =>{
    try {
        const biblioteca = await bibliotecaSchema.findById(req.params.id)
        res.status(200).json(biblioteca)
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
        
    }
}


const deletarBiblioteca = async(req, res) => {
   
    try {

        const biblioteca = await bibliotecaSchema.findById(req.params.id)
        console.log( `VALOR EXCLUIDO:`,biblioteca)
        await biblioteca.delete()
         

        res.status(200).json({
            message : `Biblioteca removida do Sistema`
        })

    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
}

const atualizarBiblioteca = async (req,res) => {
    
    try {
    
    const {id} = req.params
    const {nome,cnpj,telefone,iniciativa_privada,endereco,bairros_atuantes,site,atividades_disponiveis,pessoa_responsavel} = req.body
    const procurarBiblioteca = await bibliotecaSchema.findById(id)

    procurarBiblioteca.nome = nome || procurarBiblioteca.nome
    procurarBiblioteca.cnpj = cnpj || procurarBiblioteca.cnpj
    procurarBiblioteca.telefone = telefone || procurarBiblioteca.telefone
    procurarBiblioteca.iniciativa_privada = iniciativa_privada || procurarBiblioteca.iniciativa_privada
    procurarBiblioteca.cnpj = endereco || procurarBiblioteca.endereco
    procurarBiblioteca.bairros_atuantes = bairros_atuantes || procurarBiblioteca.bairros_atuantes
    procurarBiblioteca.site = site || procurarBiblioteca.site
    procurarBiblioteca.atividades_disponiveis = atividades_disponiveis || procurarBiblioteca.atividades_disponiveis
    procurarBiblioteca.pessoa_responsavel = pessoa_responsavel || procurarBiblioteca.pessoa_responsavel
     
    const bibliotecaAtualizada = procurarBiblioteca.save()
    res.status(200).json({
        message :  `Biblioteca Atualizada`
    
    })


    } catch (error) {
     
        res.status(400).json({
            message : error.message
        })
        
    }
}







module.exports = {
    criarBiblioteca,
    buscarBiblioteca,
    deletarBiblioteca,
    buscarBibliotecaPorId,
    atualizarBiblioteca
}
    
