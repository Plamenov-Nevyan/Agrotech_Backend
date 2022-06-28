const {isPasswordValid} = require('../utils/validators')
const {ifUserExists} = require('../services/authServices')

module.exports = async (req, res, next) => {
    try{
        let [isUsernameTaken, isEmailTaken] = await ifUserExists(req.body.username, req.body.email)
        if(isUsernameTaken){
            throw new Error('Username is already taken...')
        }
        else if(isEmailTaken){
            throw new Error('Email is already taken...')
        }
        isPasswordValid()
        next()
    }catch(err){
        res.status(403).json({message: err.message})
    }
}