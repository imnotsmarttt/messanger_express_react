const {Router} = require('express')
const chatController = require('../controllers/chatController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()


router.post('/create', authMiddleware, chatController.create)
router.post('/invite', authMiddleware, chatController.inviteMemberToChat)
router.get('/my', authMiddleware, chatController.getMyChats)
router.post('/message', authMiddleware, chatController.sendMessage)
router.get('/:id', authMiddleware, chatController.get)




module.exports = router