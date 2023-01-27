require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routers = require('./routers/index')
const sequelize = require('./db')
const models = require('./models/index')

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', routers)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {console.log(`Server was started on port ${PORT}`)})

    } catch (e) {
        console.log(e)
    }
}

start()
