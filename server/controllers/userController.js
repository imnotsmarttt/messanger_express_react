const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {User} = require('../models/index')

const generateJwt = (id, username) => {
    return jwt.sign(
        {id, username},
        process.env.JWT_SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async register(req, res) {
        const {username, password, password2} = req.body
        if (!username || !password | !password2) {
            return res.status(401).json({message: "Please fill all fields!"})
        }
        const client = await User.findOne({where: {username}})
        if (client) {
            return res.status(401).json({message: "User is already exist"})
        }
        if (password !== password2) {
            return res.status(401).json({message: "Password didnt match"})
        }
        const hashedPassword = await bcrypt.hash(password, 5)
        const user = await User.create({username, password: hashedPassword})

        const token = generateJwt(user.id, user.username)
        return res.json({token})
    }

    async login(req, res) {
        const {username, password} = req.body
        if (!username || !password) {
            return res.status(401).json({message: "Please fill all fields!"})
        }
        const user = await User.findOne({where: {username}})
        if (!user) {
            return res.status(401).json({message: "User is not exist!"})
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(401).json({message: "Password isn't correct!"})
        }
        const token = generateJwt(user.id, user.username)
        return res.json({token})
    }

    async check(req, res) {
        const user = req.user
        const token = generateJwt(user.id, user.username)
        return res.status(200).json({token})
    }

    async get_current_user(req, res) {
        const user = req.user
        return res.status(200).json({user})
    }
}

module.exports = new UserController()