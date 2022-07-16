const router = require('express').Router()
const {registerUser, createSession, loginUser} = require('../services/authServices')
const authValidator = require('../middlewares/authValidator')
const {getNews} = require('../services/newsService')


router.get('/', (req, res) => {
    getNews()
    .then(resp => resp.json())
    .then(news => {
      res.json(news)
    })
   .catch(err => console.log(err))
})

router.post('/register', authValidator, (req, res) => {
   registerUser(req.body)
  .then((user) =>{
     let userData = createSession(user)
     res.json(userData)
    })
  .catch(err => res.json({message: err.message}))
})

router.post('/login', authValidator,(req,res) => {
 loginUser(req.body.email)
 .then((user) => {
    let userData = createSession(user)
    res.json(userData)
 })
 .catch(err => res.json({message: err.message}))
})

module.exports = router