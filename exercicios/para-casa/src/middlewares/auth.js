const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

//checar a autorizacao do usuario

exports.checkAuth = (req, res, next) => {
    
    const authHeader = req.get('authorization');
    if (!authHeader) {
        return res.status(401).send({
            message: 'Usuário sem autorização.',
            statusCode: 401
        });
    }
    
    const token = authHeader.split(' ')[1];
    console.log("Token:", token)
    
    if (!token) {
        return res.status(401).send({
            message: "Erro no token!"
        })
    }
    
    try {
        jwt.verify(token, SECRET, (err) => {
            if(err) {
                return res.status(401).send({
                    message: "Não foi autorizado."
                })    
            }
            next();
        })
    } catch(err) {
        console.error(err)
    }
}