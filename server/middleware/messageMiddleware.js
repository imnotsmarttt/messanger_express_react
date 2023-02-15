const ApiError = require('../exceptions/apiError')
const {Message, User} = require("../models");

module.exports = async (req, res, next) => {
    try {
        const message = await Message.findByPk(req.params.messageId, {
            include: {
                model: User,
                where: {id: req.user.id}
            }
        })
        if (!message) {
            return next(ApiError.BadRequestError('Message doesn\'t exist or current user not author of this message'))
        }
        next()
    } catch (e) {
        return next(ApiError.BadRequestError('Server error'))
    }
}