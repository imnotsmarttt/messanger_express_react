const {Chat, User, Message} = require('../models/index')
const ApiError = require('../exceptions/apiError')
const {
    fetchChatByUsers,
    fetchChatById,
    createChat,
    sendMessage,
    getMyChats,
    editMessage
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

    async deleteChat(req, res) {

    }

    async getOrCreateChat(req, res) {
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

    async getChatById(req, res) {
        const {id} = req.params
        const chat = await fetchChatById(id)

        return res.json({chat})
    }

    async sendMessage(req, res) {
        const {chatId, message} = req.body
        const userId = req.user.id
        const messageData = await sendMessage(message, chatId, userId)
        return res.json({messageData})
    }

    async deleteMessage(req, res,) {
        const {messageId} = req.params
        await Message.destroy({
            where: {id: messageId}
        })
        return res.json({success: "message deleted"})
    }

    async editMessage(req, res) {
        const {messageId} = req.params
        const newMessage = req.body.newMessage
        const messageData = await editMessage(messageId, newMessage)
        return res.json({messageData})
    }

    async getMyChats(req, res) {
        const chats = await getMyChats(req.user.id)
        return res.json({chats})
    }
}

module.exports = new ChatController()