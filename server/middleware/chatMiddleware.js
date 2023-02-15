const ApiError = require('../exceptions/apiError')
const {Chat} = require("../models");

module.exports = async (req, res, next) => {
    try {
        const id = req.method == "GET" ? req.params.id : req.body.chatId
        const chat = await Chat.findByPk(id)
        if (!chat) {
            return next(ApiError.BadRequestError('Chat is not exist'))
        }
        const chatUsers = await chat.getMembers()
        const user = chatUsers.find(user => user.id == req.user.id)
        if(!user) {
            return next(ApiError.BadRequestError('You are not member in this chat'))
        }
        next()
    } catch (e) {
        return next(ApiError.BadRequestError('Server error'))
    }
}