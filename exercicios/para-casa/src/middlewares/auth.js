const jwt = require("jsonwebtoken")

const SECRET = process.env.SECRET


exports.checkAuth = (request, response, next) => {

    const authHeader = request.get("authorization") 

    if(!authHeader){
        response.status(401).send({
            message: "Sem autorização",
            statusCode: 401
        })
    }

    const token = authHeader.split(" ")[1]

    if(!token) {
        return response.status(401).send({
            message: "Sem autorização"
        })
    }

    try {
        jwt.verify(token, SECRET, (err) => {
            if(err) {
                return response.status(401).send({
                    message: "Sem autorização"
                })
            }
            next()
        })
    } catch (error) {
        response.status(500).send({
            message: error.message
        })
    }
}