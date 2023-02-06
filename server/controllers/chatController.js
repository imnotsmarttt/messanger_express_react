const {Chat, User, Message} = require('../models/index')
const ApiError = require('../exceptions/apiError')
const {Op} = require('sequelize')


class ChatController {
    async create(req, res) {
        const user1 = await User.findByPk(req.body.userId)
        const user2 = await User.findByPk(req.user.id)
        const chat = await Chat.create({})

        await chat.addMembers(user1)
        await chat.addMembers(user2)
        return res.send(chat)
    }

    async inviteMemberToChat(req, res) {
        const {chatId, userId} = req.body
        const chat = await Chat.findByPk(chatId)
        const user = await User.findByPk(userId)
        if (!chat) {
            return ApiError.BadRequestError('Chat is not exist!')
        }
        if (!user) {
            return ApiError.BadRequestError('User is not exist!')
        }
        await chat.addMembers(user)
        return res.json({chat})
    }

    async delete(req, res) {

    }

    async get(req, res) {
        const {userId} = req.body
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
        const chat = response.chats.filter(chat => {
            const user = chat.members.find(user => user.id === userId)
            return user ? chat : null
        })
        if (chat.length <= 0) {
            const user1 = await User.findByPk(userId)
            const user2 = await User.findByPk(req.user.id)
            const chat = await Chat.create()

            await chat.addMembers([user1, user2])
            return res.send(chat)
        }
        return res.json(chat)
    }

    async sendMessage(req, res) {
        const {chatId, message} = req.body
        const userId = req.user.id
        const messageData = await Message.create({message, chatId, userId})
        const user = await messageData.getUser({
            attributes: ['id', 'username']
        })
        const response = {
            messageData: {
                id: messageData.id,
                message: messageData.message,
                user
            }
        }
        return res.json({messageData: response.messageData})
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