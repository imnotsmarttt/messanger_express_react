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
const {Op} = require('sequelize')

class ChatController {
    async create(req, res) {
        const user1 = await User.findByPk(req.body.userId)
        const user2 = await User.findByPk(req.user.id)
        const chat = await Chat.create({})

        await chat.addMembers(user1)
        await chat.addMembers(user2)
        return res.json({chat})
    }

    async inviteMemberToGroup(req, res, next) {
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

    async createGroup(req, res, next) {
        const {groupName, users} = req.body
        const g = await Chat.findOne({
            where: {name: groupName}
        })
        if (g) {
            return next(ApiError.BadRequestError('Group with this name exist'))
        }
        const group = await Chat.create({type: "GROUP", name: groupName})
        const admin = await User.findByPk(req.user.id)
        await group.addMembers(admin)
        for (const user of users) {
            const u = await User.findByPk(user.id)
            if (u) {
                await group.addMembers(u)
            }
        }
        return res.json(group)
    }

    async findChatOrGroup(req, res) {
        const query = req.query.q
        const users = await User.findAll({
            where: {
                username: {[Op.iLike]: `${query}%`},
            },
            attributes: ['id', 'username']
        })
        const groups = await Chat.findAll({
            where: {
                type: 'GROUP',
                name: {[Op.iLike]: `${query}%`}
            },
            attributes: ['id', 'type', 'name'],
            include: {
                model: Message,
                include: {
                    model: User,
                    attributes: ['username'],
                },
                order: [['createdAt', 'DESC']],
                limit: 1,
                attributes: ['id', 'message', 'createdAt', 'userId']
            }
        })
        const result = [...users, ...groups]
        return res.json({result})
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