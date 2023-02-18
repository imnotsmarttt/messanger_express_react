const {Router} = require('express')
const chatController = require('../controllers/chatController')
const authMiddleware = require('../middleware/authMiddleware')
const chatMiddleware = require('../middleware/chatMiddleware')
const messageMiddleware = require('../middleware/messageMiddleware')

const router = Router()


router.get('/search', authMiddleware, chatController.findChatOrGroup)
router.post('/create', authMiddleware, chatController.create)
router.post('/create/group', authMiddleware, chatController.createGroup)
router.post('/invite', authMiddleware, chatMiddleware, chatController.inviteMemberToGroup)
router.delete('/message/:messageId', authMiddleware, messageMiddleware, chatController.deleteMessage)
router.put('/message/:messageId', authMiddleware, messageMiddleware, chatController.editMessage)
router.post('/message', authMiddleware, chatMiddleware, chatController.sendMessage)
router.get('/my', authMiddleware, chatController.getMyChats)
router.get('/:id', authMiddleware, chatMiddleware, chatController.getChatById)
router.get('/', authMiddleware, chatController.getOrCreateChat)





module.exports = router