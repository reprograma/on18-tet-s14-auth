const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

exports.checkAuth = (req, res, next) => {
    
    const authHeader = req.get('authorization');
    if (!authHeader) {
        return res.status(401).send({
            message: 'Token nao autorizado',
            statusCode: 401
        });
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).send({
            message: "Token nao encontrado"
        })
    }
    
    try {
        jwt.verify(token, SECRET, (err) => {
            if(err) {
                return res.status(401).send({
                    message: "Token nao autorizado"
                })    
            }
            next();
        })
    } catch(err) {
        console.error(err)
    }
}