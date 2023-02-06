const jwt = require('jsonwebtoken')
const ApiError = require('../exceptions/apiError')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decode) {
            ApiError.UnauthorizedError()
            return next(ApiError.UnauthorizedError())
        }
        req.user = decode
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}