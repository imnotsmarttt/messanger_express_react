const {Chat, User} = require('../models/index')
const ApiError = require('../exceptions/apiError')
const {
    fetchChatByUsers,
    fetchChatById,
    createChat,
    sendMessage,
    getMyChats
} = require('../services/chat')


class ChatController {
    async create(req, res) {
        const user1 = await User.findByPk(req.body.userId)
        const user2 = await User.findByPk(req.user.id)
        const chat = await Chat.create({})

        await chat.addMembers(user1)
        await chat.addMembers(user2)
        return res.json({chat})
    }

    async inviteMemberToChat(req, res, next) {
        const {chatId, userId} = req.body
        const chat = await Chat.findByPk(chatId)
        const user = await User.findByPk(userId)
        if (chat.type === "CHAT") {
            return next(ApiError.BadRequestError('Invite available only for group'))
        }
        if (!user) {
            return next(ApiError.BadRequestError('User is not exist!'))
        }
        await chat.addMembers(user)
        return res.json({chat})
    }

    async delete(req, res) {

    }

    async get(req, res, next) {
        const userId1 = req.body.userId
        const userId2 = req.user.id
        const chat = await fetchChatByUsers(userId1, userId2)
        if (chat.length <= 0) {
            await createChat(userId1, userId2)
            const chat = await fetchChatByUsers(userId1, userId2)
            return res.json({chat})
        }
        return res.json({chat})
    }

    async getById(req, res, next) {
        const {id} = req.params
        await checkIfUserInChat(id, req.user.id, next)
        const chat = await fetchChatById(id)

        return res.json({chat})
    }

    async sendMessage(req, res, next) {
        const {chatId, message} = req.body
        const userId = req.user.id
        const messageData = await sendMessage(message, chatId, userId)
        return res.json({messageData})
    }

    async deleteMessage(req, res) {

    }

    async getMyChats(req, res) {
        const chats = await getMyChats(req.user.id)
        return res.json({chats})
    }
}

module.exports = new ChatController()