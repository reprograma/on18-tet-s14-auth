const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

// oq o codigo faz ao ser executado
// (req) Faca alteracoes na solicitacao e nos objetos de resposta
// (res) Encerrar o ciclo de solicitacao-resposta
// (next) Chama o proximo middleware na fila OU NESSE CASO chame o controller

// quero checar a autorizacao do usuario
exports.checkAuth = (req, res, next) => {

    const authHeader = req.get("authorization");
    if(!authHeader) {
        return res.status(401).send({
            mensagem: "Você não tem autorização!",
            statusCode: 401
        });
    }
    
    const token = authHeader.split(' ')[1];
    console.log("O token: ", token)
    if(!token) {
        return res.status(401).send({
        mensagem: "Erro no token"
    })
    }
    
    try {
        jwt.verify(token, SECRET, (error) =>{
            if(error) {
            return res.status(401).send({
                mensagem: "Não autorizada"
            })
        }
        next();
        })
    } catch (error) {
        console.error(error)
    }
}