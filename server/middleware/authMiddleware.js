const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decode) {
            res.json(401).json({message: 'Authorization error'})
            next()
        }
        req.user = decode
        next()
    } catch (e) {
        res.json(401).json({message: 'Authorization error'})
        next()
    }
}