const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {User} = require('../models/index')
const ApiError = require('../exceptions/apiError')

const generateJwt = (id, username) => {
    return jwt.sign(
        {id, username},
        process.env.JWT_SECRET_KEY,
        {expiresIn: '1d'}
    )
}

class UserController {
    async register(req, res) {
        const {username, password, password2} = req.body
        if (!username || !password | !password2) {
            return ApiError.BadRequestError('Please fill all fields!')
        }
        const client = await User.findOne({where: {username}})
        if (client) {
            return ApiError.BadRequestError('User is already exist')
        }
        if (password !== password2) {
            return ApiError.BadRequestError('Password didnt match')
        }
        const hashedPassword = await bcrypt.hash(password, 5)
        const user = await User.create({username, password: hashedPassword})

        const token = generateJwt(user.id, user.username)
        return res.json({token})
    }

    async login(req, res) {
        const {username, password} = req.body
        if (!username || !password) {
            return ApiError.BadRequestError('Please fill all fields!')
        }
        const user = await User.findOne({where: {username}})
        if (!user) {
            return ApiError.BadRequestError('User is not exist')
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return ApiError.BadRequestError('Wrong password')
        }
        const token = generateJwt(user.id, user.username)
        return res.json({token})
    }

    async check(req, res) {
        const user = req.user
        const token = generateJwt(user.id, user.username)
        return res.status(200).json({token})
    }

    async get_current_user(req, res, next) {
        const user = req.user
        return res.status(200).json({user})
    }
}

module.exports = new UserController()