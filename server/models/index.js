const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    username: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
})

const Chat = sequelize.define('chat', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    type: {type: DataTypes.STRING, defaultValue: 'CHAT'}, // could be chat or group
    name: {type: DataTypes.STRING}
})

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    message: {type: DataTypes.STRING}
})


const ChatUsers = sequelize.define('chat_users', {
    chatId: {
        type: DataTypes.INTEGER,
        references: {
            model: Chat,
            key: 'id',
        },
        allowNull: false
    },

    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false
    }
})


Chat.hasMany(Message, {
    foreignKey: 'chatId'
})
Message.belongsTo(Chat)

User.hasMany(Message, {
    foreignKey: 'userId'
})
Message.belongsTo(User)

User.belongsToMany(Chat, {as: "chats", through: ChatUsers})
Chat.belongsToMany(User, {as: "members", through: ChatUsers})


module.exports = {
    User,
    Chat,
    Message,
    ChatUsers
}
