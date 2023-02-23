require('dotenv').config()
const express = require('express')
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')

const routers = require('./routers/index')
const sequelize = require('./db')
const errorMiddleware = require('./middleware/errorMiddleware')

const PORT = process.env.PORT
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
    },
});

app.use(express.json())
app.use(cors())
app.use('/api', routers)
app.use(errorMiddleware)


io.on('connection', (socket) => {
    console.log('user connected to ' + socket.id)
    socket.on('disconnect', () => {
        console.log('Disconnected');
    });

    socket.on('join_room', (chatId) => {
       socket.join(chatId)
    });

    socket.on('leave_room', (chatId) => {
        socket.leave(chatId)
    })

    socket.on('message_create', (data) => {

        socket.to(data.chatId).emit('message_receive', data)
    });
});

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        server.listen(PORT, () => {console.log(`Server was started on port ${PORT}`)})

    } catch (e) {
        console.log(e)
    }
}

start()
