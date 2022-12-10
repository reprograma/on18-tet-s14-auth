const router = require ('express').Router()

router.get('/', (req,res) =>{
    res.send({
        'versao' : '1.0',
        'titulo' : 'projeto testando vercel',
        'descricao': ''
    })
})


module.exports = router