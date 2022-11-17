const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

// Execute esse codigo
// (request) Faca alteracoes na solicitacao e nos objetos de resposta
// (response) Encerrar o ciclo de solicitacao-resposta
// (next) Chama o proximo middleware na fila OUUUUU NESSE CASO chame o controllerrrrr

// quero checar a autorizacao do usuario
exports.checkAuth = (request, response, next) => {

    const authHeader = request.get('authorization');
    if (!authHeader) {
        return response.status(401).send({
            message: 'Acesso não autorizado!',
            statusCode: 401
        });
    }

    const token = authHeader.split(' ')[1];
    console.log("Token OK", token)

    if (!token) {
        return response.status(401).send({
            message: "Token incorreto?"
        })
    }

    try {
        jwt.verify(token, SECRET, (err) => {
            if (err) {
                return response.status(401).send({
                    message: "Nao autorizada!"
                })
            }
            next();
        })
    } catch (err) {
        console.error(err)
    }
}