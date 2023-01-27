const {Router} = require('express')
const chatController = require('../controllers/chatController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()


router.post('/create', authMiddleware, chatController.create)
router.post('/invite', authMiddleware, chatController.inviteMemberToChat)
router.get('/:id', authMiddleware, chatController.get)
router.post('/message', authMiddleware, chatController.sendMessage)


module.exports = router