const {Chat, User, Message} = require('../models/index')
const ApiError = require('../exceptions/apiError')
const {
    fetchChatByUsers,
    fetchChatById,
    createChat,
    sendMessage,
    checkIfUserInChat
} = require('../services/chat')


class ChatController {
    async create(req, res) {
        const user1 = await User.findByPk(req.body.userId)
        const user2 = await User.findByPk(req.user.id)
        const chat = await Chat.create({})

        await chat.addMembers(user1)
        await chat.addMembers(user2)
        return res.send(chat)
    }

    async inviteMemberToChat(req, res, next) {
        const {chatId, userId} = req.body
        const chat = await Chat.findByPk(chatId)
        const user = await User.findByPk(userId)
        if (!chat) {
            return next(ApiError.BadRequestError('Chat is not exist!'))
        }
        if (!user) {
            return next(ApiError.BadRequestError('User is not exist!'))
        }
        const userInChat = await checkIfUserInChat(chatId, req.user.id)
        if (!userInChat) {
            return next(ApiError.BadRequestError('User not in chat'))
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
        const chat = await fetchChatById(id)
        return res.json({chat})
    }

    async sendMessage(req, res, next) {
        const {chatId, message} = req.body
        const userId = req.user.id
        const userInChat = await checkIfUserInChat(chatId, userId)
        if (!userInChat) {
            return next(ApiError.BadRequestError('User not in chat'))
        }
        const messageData = await sendMessage(message, chatId, userId)
        return res.json({messageData})
    }

    async deleteMessage(req, res) {

    }

    async getMyChats(req, res) {
        const response = await User.findByPk(req.user.id,
            {
                include: {
                    model: Chat,
                    as: 'chats',
                    through: {attributes: []},
                    include: [
                        {
                            model: User,
                            as: 'members',
                            through: {attributes: []},
                            attributes: ['id', 'username'],
                        },
                        {
                            model: Message,
                            include: {
                                model: User,
                                attributes: ['username'],
                            },
                            order: [['createdAt', 'DESC']],
                            limit: 1,
                            attributes: ['id', 'message', 'createdAt', 'userId']
                        }
                    ]
                }
            }
        )
        const chats = response.chats.filter(o => o.messages.length !== 0)

        return res.json({chats})
    }
}

module.exports = new ChatController()