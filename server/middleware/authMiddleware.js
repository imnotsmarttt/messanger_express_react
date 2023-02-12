const jwt = require('jsonwebtoken')
const ApiError = require('../exceptions/apiError')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decode) {
            return next(ApiError.UnauthorizedError())
        }
        req.user = {
            id: decode.id,
            username: decode.username,
        }
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}