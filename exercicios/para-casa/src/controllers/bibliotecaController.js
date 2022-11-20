const mongoose = require("mongoose");
const BibliotecaSchema = require("../models/BibliotecaSchema");
const bcrypt = require("bcrypt");


const criarBiblioteca = async(requisicao, resposta) => {
  const { nome, cnpj, telefone, iniciativa_privada,
      endereco: { cep, rua, numero, complemento, referencia, estado, cidade, bairro },
      bairros_atuantes, site, atividades_disponiveis, responsavel } = requisicao.body;

  // //Regras de negócio: Respeitar o tipo de dado e preenchimento obrigatório;
  // if (typeof (nome) !== 'string' || nome.trim() === "") {
  //     return resposta.status(400).send({ Alerta: `A string nome é obrigatória` })
  // } else if (typeof (cnpj) !== 'string') {
  //     return resposta.status(400).send({ Alerta: `O número do CNPJ é obrigatório` })
  // } else if (typeof (iniciativa_privada) !== 'boolean') {
  //     return resposta.status(400).send({ Alerta: `Responda com true ou false` })
  // } else if (typeof (cep) !== 'string' || cep.trim() === "") {
  //     return resposta.status(400).send({ Alerta: `O número do CEP é obrigatório` })
  // } else if (typeof (rua) !== 'string' || rua.trim() === "") {
  //     return resposta.status(400).send({ Alerta: `A string rua é obrigatória` })
  // } else if (typeof (numero) !== 'number') {
  //     return resposta.status(400).send({ Alerta: `O número da residência é obrigatório` })
  // } else if (typeof (complemento) !== 'string' || complemento.trim() === "") {
  //     return resposta.status(400).send({ Alerta: `O complemento deve ser uma string` })
  // } else if (typeof (referencia) !== 'string' || referencia.trim() === "") {
  //     return resposta.status(400).send({ Alerta: `A referência deve ser uma string` })
  // } else if (typeof (estado) !== 'string' || estado.trim() === "") {
  //     return resposta.status(400).send({ Alerta: `A string estado é obrigatória` })
  // } else if (typeof (cidade) !== 'string' || cidade.trim() === "") {
  //     return resposta.status(400).send({ Alerta: `A string cidade é obrigatória` })
  // } else if (typeof (bairro) !== 'string' || bairro.trim() === "") {
  //     return resposta.status(400).send({ Alerta: `A string bairro é obrigatória` })
  // } else if (typeof (responsavel) !== 'string' || responsavel.trim() === "") {
  //     return resposta.status(400).send({ Alerta: `A string da pessoa responsável pela cozinha é obrigatória` })
  // }
  try{

      //Regras de negócio: Não poderá existir bibliotecas com o mesmo cnpj
      const buscarCnpj = await BibliotecaSchema.find({ cnpj })

      if (buscarCnpj.length !== 0) {
          return resposta.status(400).json({ Prezados: `Este número de CNPJ já existe no nosso banco de dados` });
      }

      //Regras de negócio: Não aceitará CNPJ com menos de 14 caracteres
      if(String(cnpj).length > 14 || String(cnpj).length < 14){
          resposta.status(400).json({
              message:`CNPJ deve ter 14 caracteres.`
          })
      }

      //Regras de negócio: Não poderá existir cozinhas com o mesmo nome no mesmo bairro
      const buscaBairro = await BibliotecaSchema.find({ bairro })
      let existeBairro = buscaBairro.filter((biblioteca) => biblioteca.endereco.bairro === bairro)
      let nomeExisteBairro = existeBairro.find((biblioteca) => biblioteca.nome === nome)
      if (nomeExisteBairro) {
          return resposta.status(400).json({ Prezados: `O nome desta biblioteca já existe neste bairro` });
      }

      const biblioteca = new BibliotecaSchema({
          nome: nome,
          cnpj: cnpj,
          telefone: telefone,
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
          responsavel: responsavel
      })

      const salvarBiblioteca = await biblioteca.save();
      resposta.status(201).json({
          mensagem: "Biblioteca cadastrada com sucesso!",
          biblioteca: salvarBiblioteca
      })

  }catch(error){
      resposta.status(400).json({
          message: error.message
      })
  }
}


const buscarBibliotecas = async(require, response) => {
  const {nome} = require.query;

  let query = { };

  if (nome) query.nome = new RegExp(nome, 'i');

  try {
      const biblioteca = await BibliotecaSchema.find(query);

      // OPCIONAL: Para verificar a quantidade de bibliotecas procuradas
      if (biblioteca.length > 1) {
          return response.status(200).json({ Prezados: `Encontramos ${biblioteca.length} bibliotecas.`, biblioteca })
      } else if (biblioteca.length == 1) {
          return response.status(200).json({ Prezados: `Encontramos ${biblioteca.length} biblioteca.`, biblioteca })
      } else {
          return response.status(404).json({ Prezados: `Nenhuma biblioteca encontrada.` })
      }

      // response.status(200).json(biblioteca)

  } catch (error) {
      response.status(500).json({
          message: error.message
      })
  }

  // Ou: 

  // const buscarTodasBibliotecas = async (request, response) => {
  //     try {
  
  //         const biblioteca = await BibliotecaSchema.find()
  
  // if (biblioteca.length > 1) {
  //     return response.status(200).json({ Prezados: `Encontramos ${biblioteca.length} bibliotecas.`, biblioteca })
  // } else if (biblioteca.length == 1) {
  //     return response.status(200).json({ Prezados: `Encontramos ${biblioteca.length} biblioteca.`, biblioteca })
  // } else {
  //     return response.status(404).json({ Prezados: `Nenhuma biblioteca encontrada.` })
  // }
  
  //     } catch (error) {
  //         response.status(500).json({
  //             message: error.message
  //         })
  //     }
  // }
}

const buscarBibliotecaPorId = async(req, res) => {
  try {
      const biblioteca = await BibliotecaSchema.findById(req.params.id)
      res.status(200).json(biblioteca);

  } catch (error)  {
      res.status(500).json({
          mensagem: error.message
      })
  }
}

const atualizarBiblioteca = async (request, response) => {
  const { id } = request.params
 
  const {nome, cnpj, telefone, iniciativa_privada, endereco:{cep, rua, numero, complemento, referencia, estado, cidade, bairro },
  bairros_atuantes, site, atividades_disponiveis, responsavel} = request.body;
  
  try{
      if(id.length > 24 || id.length > 24) {
          response.status(404).json({
              message:`Número de ID incorreto, por favor, digite novamente!`
          })
      }

      if (String(cnpj).length > 14 || String(cnpj).length < 14){
          response.status(404).json({
              message:`CNPJ inválido, digite novamente.`
          })
      }

      const bibliotecaEncontrada = await BibliotecaSchema.updateOne({ 
          nome, cnpj,telefone, iniciativa_privada, 
          endereco: {cep, rua,numero, complemento, referencia, estado, cidade, bairro},
          bairros_atuantes, site, atividades_disponiveis, responsavel
      })

      const bibliotecaAtualizada = await BibliotecaSchema.find({ id })
          if(bibliotecaAtualizada.length == 0 ) {
              response.status(404).json({
                  message:`Biblioteca não encontrada!`,
                  biblioteca: bibliotecaEncontrada
              })
          }
          
      response.status(200).json(bibliotecaAtualizada)

 } catch (error){
      response.status(500).json({
          message: error.message
    })
 }
}


const deletarBiblioteca = async (req, res) => {

  try {
      const bibliotecas = await BibliotecaSchema.findById(req.params.id)

      await bibliotecas.delete()

      res.status(200).send({ 
        message: "Biblioteca deletada com sucesso!",
        biblioteca: bibliotecas
    })

      //ou 
      /* const { id } = req.params

      const deletarPorId = await BibliotecaSchema.deleteOne({ id })

      res.status(200).json({ mensagem: "Biblioteca deletada com sucesso!"})
      */
     
  } catch (error) {
      res.status(500).send({ message: error })
  }
}



module.exports = {
  criarBiblioteca,
  buscarBibliotecas,
  buscarBibliotecaPorId,
  atualizarBiblioteca,
  deletarBiblioteca
}