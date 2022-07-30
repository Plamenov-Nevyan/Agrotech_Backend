const router = require('express').Router()
const authController = require('./controllers/authController')
const publicationsController = require('./controllers/publicationsController')
const commentsController = require('./controllers/commentsController')

router.use('/', authController)
router.use('/publications', publicationsController)
router.use('/comments', commentsController)

module.exports = router