const { User } = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        shoppingCart: []
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