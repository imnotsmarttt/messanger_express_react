const {User, Chat, Message} = require("../models/index");


const checkIfUserInChat = async (chatId, userId) => {
    const chat = await Chat.findByPk(chatId)
    const chatUsers = await chat.getMembers()
    const user = chatUsers.find(user => user.id == userId)
    return user ? true : false
}

const fetchChatByUsers = async (userId1, userId2) => {
    const response = await User.findByPk(userId1,
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
                        attributes: ['id', 'message', 'createdAt', 'userId']
                    }
                ]
            }
        }
    )
    const chat = response.chats.filter(chat => {
        const user = chat.members.find(user => user.id === userId2)
        return user ? chat : null
    })
    return chat
}

const fetchChatById = async (chatId) => {
    const response = await Chat.findByPk(chatId, {
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
                        attributes: ['id', 'username'],
                    },
                    attributes: ['id', 'message', 'createdAt'],
                }
            ],
        order: [
            [Message, 'createdAt']
        ]
        }
    )
    return response
}

const createChat = async (userId1, userId2) => {
    const user1 = await User.findByPk(userId1)
    const user2 = await User.findByPk(userId2)
    const chat = await Chat.create()

    await chat.addMembers([user1, user2])
    return chat
}

const sendMessage = async (message, chatId, userId) => {
    const createdMessage = await Message.create({message, chatId, userId})
    const user = await createdMessage.getUser({
        attributes: ['id', 'username']
    })
    const messageData = {
        id: createdMessage.id,
        message: createdMessage.message,
        createdAt: createdMessage.createdAt,
        user
    }
    return messageData
}

module.exports = {
    fetchChatByUsers,
    fetchChatById,
    createChat,
    sendMessage,
    checkIfUserInChat,
}