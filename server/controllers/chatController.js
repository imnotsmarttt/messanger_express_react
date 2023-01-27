const {Chat, User, Message} = require('../models/index')

class ChatController {
    async create (req, res) {
        const {userId} = req.body
        const user1 = await User.findByPk(userId)
        const user2 = await User.findByPk(req.user.id)
        const chat = await Chat.create()

        await chat.addUser(user1)
        await chat.addUser(user2)
        return res.send(chat)
    }
    async inviteMemberToChat (req, res) {
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
    async delete (req, res) {

    }
    async get (req, res) {
        const {id} = req.params
        const chat = await Chat.findByPk(id)
        const messages = await chat.getMessages()
        const response = {
            chat,
            messages
        }
        return res.json(response)
    }
    async sendMessage (req, res) {
        const {chatId, message} = req.body
        const userId = req.user.id
        const m = await Message.create({message, chatId, userId})
        return res.json({m})
    }
    async deleteMessage (req, res) {

    }

}

module.exports = new ChatController()