const router = require('express').Router()
const {registerUser, createSession, loginUser, getUserData, addProfilePic} = require('../services/authServices')
const authValidator = require('../middlewares/authValidator')
const {getNews} = require('../services/newsService')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage:storage})

router.get('/', (req, res) => {
    getNews()
    .then(resp => resp.json())
    .then(news => {
      res.json(news)
    })
   .catch(err => res.status(500).json({message:err.message}))
})

router.post('/register', authValidator, (req, res) => {
   registerUser(req.body)
  .then((user) =>{
     let userData = createSession(user)
     res.json(userData)
    })
  .catch(err => res.status(400).json({message: err.message}))
})

router.post('/login', authValidator,(req,res) => {
 loginUser(req.body.email)
 .then((user) => {
    let userData = createSession(user)
    res.json(userData)
 })
 .catch(err => res.status(400).json({message: err.message}))
})

router.get('/users/profile/:userId', (req,res) => {
   getUserData(req.params.userId)
   .then(userData => res.json(userData))
   .catch(err => res.json({message: err.message}))
})

router.post('/users/add-prof-pic/:userId', upload.any('file'), (req, res) => {
   console.log(req.file)
    if(req.file){
      addProfilePic(req.params.userId, req.file)    
      .then(() => res.status(200))
      .catch(err => res.json({message: err.message}))
    }
   else {
      addProfilePic(req.params.userId, req.image)
      .then(() => res.status(200))
      .catch(err => res.json({message: err.message}))
   }
})

module.exports = router