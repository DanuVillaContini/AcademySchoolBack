const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../common/constante")


const verifyJWT = (req, res, next) => {
    if(!req.headers.authorization)return res.status(401).json({ message: 'Unauthorization' })

    const authorization = req.headers.authorization
    const token = authorization.split(" ")[1]

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalido' })
        }
        if (decoded !== undefined && decoded.isAdmin === false){
            return res.status(403).json({ message: 'Error. No es Admin' })
        }
        next()
    })
}

module.exports = {
    verifyJWT 
}