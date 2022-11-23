const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

exports.checkAuth = (req, res, next) => {
    
    const authHeader = req.get('authorization');
    if (!authHeader) {
        return res.status(401).send({
            message: "Você não possui autorização para executar essa ação",
            statusCode:401
        });
    }

    const token = authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).send({
            message: "Erro no token"
        })
    }

    try {
        jwt.verify(token, SECRET, (err) => {
            if(err) {
                return res.status(401).send({
                    message:"Acesso não autorizado"
                })
            }
            next();
        })
        
    } catch (err) {
        console.error(err)
    }
}