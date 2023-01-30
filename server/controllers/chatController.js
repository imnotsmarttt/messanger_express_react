const {Chat, User, Message, ChatUsers} = require('../models/index')
const sequelize = require("sequelize");

class ChatController {
    async create(req, res) {
        const {userId} = req.body
        const user1 = await User.findByPk(userId)
        const user2 = await User.findByPk(req.user.id)
        const chat = await Chat.create()

        await chat.addUser(user1)
        await chat.addUser(user2)
        return res.send(chat)
    }

    async inviteMemberToChat(req, res) {
        const {chatId, userId} = req.body
        const chat = await Chat.findByPk(chatId)
        const user = await User.findByPk(userId)
        if (!chat) {
            return res.status(404).json({message: "Chat is not exist"})
        }
        if (!user) {
            return res.status(404).json({message: "User is not exist"})
        }
        await chat.addUser(user)
        return res.json({chat})
    }

    async delete(req, res) {

    }

    async get(req, res) {
        const {id} = req.params
        const chat = await Chat.findByPk(id, {
            include: {
                model: Message,
                attributes: ['id', 'message'],
                include: {

                    model: User,
                    attributes: ['id', 'username']
                }
            }
        })
        const response = {
            chat,
        }
        return res.json(response)
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
        const response = await User.findByPk(req.user.id, {
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
                            attributes: ['username']
                        },
                        order: [ [ 'createdAt', 'DESC' ] ],
                        limit: 1,
                        attributes: ['id', 'message', 'createdAt', 'userId']
                    }
                ]
            },
        })


        return res.json({chats: response.chats})
    }
}

module.exports = new ChatController()