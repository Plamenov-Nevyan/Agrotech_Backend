const router = require('express').Router()
const authController = require('./controllers/authController')
const publicationsController = require('./controllers/publicationsController')
const commentsController = require('./controllers/commentsController')
const notificationsController = require('./controllers/notificationsController')
const messagesController = require('./controllers/messagesController')

router.use('/', authController)
router.use('/publications', publicationsController)
router.use('/comments', commentsController)
router.use('/notifications', notificationsController)
router.use('/messages', messagesController)

module.exports = router