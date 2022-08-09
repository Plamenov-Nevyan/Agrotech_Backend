const { User } = require('../models/User')
const {Blacklist} = require('../models/Blacklist')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uploadFile = require('../utils/googleUpload')
const fetch = require('node-fetch')

exports.ifUserExists =  (username, email) => Promise.all([ 
    User.exists({ username }).exec(),
    User.exists({ email }).exec()
   ])


exports.registerUser = async (userData) => {
        try {
            let hash = await bcrypt.hash(userData.password, Number(process.env.SALT_ROUNDS))
            userData.password = hash
            userData.phoneNumber ? delete userData.uic : delete userData.uic
            return User.create({
             ...userData
            })
        } catch (err) {
            throw new Error(err.message)
        }
}

exports.loginUser = (email) => User.findOne({email})

exports.createSession = (user) => {
    let payload = {...user._doc}
    let accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'1d'})
    return {
        username: payload.username,
        email: payload.email,
        _id: payload._id,
        accessToken,
        // shoppingCart: []
    }
}

exports.ifUserIsRegistered = async(email, password) => {
    let isInfoCorrect = true
    let user = await User.findOne({email})
   if(user){
    let isPassCorrect = await bcrypt.compare(password, user.password)
     if(!isPassCorrect){isInfoCorrect = false}
   }
   else{
    isInfoCorrect = false
   }
  return isInfoCorrect
}

exports.getUserData = async(userId) => {
    let user = await User.findById(userId)
    .populate('publicationsLiked')
    .populate('publicationsFollowed')
    .populate('publicationsCreated')
    return user
}

exports.addProfilePic = async (userId, profilePic) => {
   if(typeof profilePic === 'object'){
    uploadFile(profilePic)
    .then(async (resp) => {
        let imageLink = `https://drive.google.com/uc?export=view&id=${resp.data.id}`
        let user = await User.findById(userId)
        user.image = imageLink
        await user.save()
    })
    .catch(err => console.log(err))
   }
   else {
      User.findById(userId)
      .then(async (user) => {
        user.image = profilePic
        await user.save()
      })
     .catch(err => {throw err})
   }
}

exports.checkIfEmailExists = async (email) => {
    let resp = await fetch(`https://api.emailable.com/v1/verify?email=${email}&api_key=${process.env.EMAIL_VERIFICATION_KEY}`)
    let data = await resp.json()
    if(data.state !== 'deliverable'){
        throw {
            message : `Email adress doesn\'t exist or it\'s unsafe to use!`
        }
    }
}

exports.blacklistToken = (token) => Blacklist.create({token})

exports.checkIfTokenIsRevoked = (receivedToken) => Blacklist.findOne({token : receivedToken})