const router = require('express').Router()
const {registerUser, createSession} = require('../services/authServices')
const authValidator = require('../middlewares/authValidator')


router.get('/', (req, res) => {
    res.json({'message': 'Hello Brother !'})
})

router.post('/register', authValidator, (req, res) => {
   registerUser(req.body.username, req.body.email, req.body.password, req.body.rePassword)
  .then((user) =>{
     let userData = createSession(user)
     res.json(userData)
    })
  .catch(err => res.json({message: err.message}))
})

module.exports = router