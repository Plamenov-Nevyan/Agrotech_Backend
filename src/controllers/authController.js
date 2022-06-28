const router = require('express').Router()
const authServices = require('../services/authServices')

router.get('/', (req, res) => {
    res.json({'message': 'Hello Brother !'})
})

router.post('/register', (req, res) => {
  authServices.registerUser(req.body.username, req.body.password)
  .then((user) => res.json(user))
})

module.exports = router