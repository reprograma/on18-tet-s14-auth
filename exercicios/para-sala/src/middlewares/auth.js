const jwt = require('jsonwebtoken'); //chamar o jwt 

const  SECRET = process.env.SECRET;

// NO CHECKAUTH:
// Executar esse codigo
// (req) Fazer alteracoes na solicitacao e nos objetos de resposta
// (res) Encerrar o ciclo de solicitacao-resposta
// (next) Chamar o proximo middleware na fila OUUUUU NESSE CASO chame o controllerrrrr
exports.checkAuth = (req, res) => {
    
    const authHeader = req.get('authorization');
    if (!authHeader) {
        return res.status(401).send({
            message: 'Sem autorizacao amore',
            statusCode: 401
        });
    }
    
    const token = authHeader.split(' ')[1];
    console.log("tokenzinhooo", token)
    
    if (!token) {
        return res.status(401).send({
            message: "erro no token ok?"
        })
    }
    try {
        jwt.verify(token, SECRET, (err) => {
            if(err) {
                return res.status(401).send({
                    message: "Nao autorizada, mami"
                })    
            }
            next();
        })
    } catch(err) {
        console.error(err)
    }
}