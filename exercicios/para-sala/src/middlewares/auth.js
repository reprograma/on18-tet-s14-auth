const jwt = require('jsonwebtoken');

const SCRET = process.env.SECRET;

exports.checkAuth = (request, response, next) => {
    
    const authHeader = request.get('authorization');
    
    if(!authHeader){
        return response.status(401).send({
            message: "Sem autorização"
        })
    }

    const token = authHeader.split(' ')[1];
    console.log(token)

    if(!token){
        return response.status(401).send({
            message: "Erro de token, favor fornecer token correto"
        })
    }

    try{
        jwt.verify(token, SCRET, (Error) => {
            if(Error){
                return response.status(401).send({
                    message: "Não autorizado(a)"
                })
            }
            next();
        })
    }catch(Error){
        console.error(Error)
    }
}