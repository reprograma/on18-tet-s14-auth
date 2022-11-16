require('dotenv').config();

//const express = require('express')
const app = require('./src/app')
//const cors =  require('cors')
const PORT= process.env.PORT
//const app = express()
app.get('/',function(req,res){
    res.send({
        message : 'get teste'
    })
})


//app.listen(PORT, ()=>console.log(`Servidor rodando na porta ${PORT}`))

app.listen(PORT,()=>{
    console.log(`Projeto Biblioteca autenticada rodando.   PORTA: ${PORT}`)
})

