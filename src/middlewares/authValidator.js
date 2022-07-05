const {isPasswordValid, areFieldsEmpty} = require('../utils/validators')
const {ifUserExists, ifUserIsRegistered} = require('../services/authServices')

module.exports = async (req, res, next) => {
 try{   
    await validatorHandlers[req.path](req.body)
    next()
}catch(err){ 
    res.status(403).json({message: err.message})
}
}

const validatorHandlers = {
    '/register': async function(reqBody){
        try{
            areFieldsEmpty([reqBody.username, reqBody.email, reqBody.password, reqBody.confirm])
            let [isUsernameTaken, isEmailTaken] = await ifUserExists(reqBody.username, reqBody.email)
            if(isUsernameTaken){
                throw new Error('Username is already taken...')
            }
            else if(isEmailTaken){
                throw new Error('Email is already taken...')
            }
            isPasswordValid(reqBody.password, reqBody.confirm)
        }catch(err){
           throw err
        }
   },
   '/login': async function(reqBody){
       try{
        areFieldsEmpty([reqBody.email, reqBody.password])
        let isInfoCorrect = await ifUserIsRegistered(reqBody.email, reqBody.password)
        if(!isInfoCorrect){throw new Error('Email and/or password is incorrect...')}
       }
       catch(err){
        throw err
       }
   }
}