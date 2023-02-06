const {Router} = require('express')
const router = Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/me', authMiddleware, userController.get_current_user)

module.exports = router