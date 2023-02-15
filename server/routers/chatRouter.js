const {Router} = require('express')
const chatController = require('../controllers/chatController')
const authMiddleware = require('../middleware/authMiddleware')
const chatMiddleware = require('../middleware/chatMiddleware')

const router = Router()


router.post('/create', authMiddleware, chatController.create)
router.post('/invite', authMiddleware, chatMiddleware, chatController.inviteMemberToChat)
router.post('/message', authMiddleware, chatMiddleware, chatController.sendMessage)
router.get('/my', authMiddleware, chatController.getMyChats)
router.get('/:id', authMiddleware, chatMiddleware, chatController.getById)
router.get('/', authMiddleware, chatController.get)





module.exports = router