const router = require('express').Router()
const authController = require('./controllers/authController')
const publicationsController = require('./controllers/publicationsController')

router.use('/', authController)
router.use('/publications', publicationsController)

module.exports = router