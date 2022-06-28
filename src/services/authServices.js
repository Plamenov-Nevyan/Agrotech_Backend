const { User } = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.ifUserExists =  (username, email) => Promise.all([ 
    User.exists({ username }).exec(),
    User.exists({ email }).exec()
   ])


exports.registerUser = async (username,email, password) => {
        try {
            let hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
            return User.create({
                username,
                email,
                password: hash
            })
        } catch (err) {
            throw new Error(err.message)
        }
}

exports.createSession = (user) => {
    let payload = Object.assign({}, user)
    let accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'1d'})
    return {
        username: user.username,
        email: user.email,
        _id: user._id,
        accessToken
    }
}