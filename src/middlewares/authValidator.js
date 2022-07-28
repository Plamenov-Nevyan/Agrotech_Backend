const {isPasswordValid, areFieldsEmpty, isEmailValid, isUsernameValid} = require('../utils/validators')
const {ifUserExists, ifUserIsRegistered, checkIfEmailExists} = require('../services/authServices')

module.exports = async (req, res, next) => {
 try{   
    await validatorHandlers[req.path](req.body)
    next()
}catch(err){ 
    res.status(400).send({message: err.message})
}
}

const validatorHandlers = {
    '/register': async function(reqBody){
        try{
            areFieldsEmpty([reqBody.username, reqBody.email, reqBody.password, reqBody.confirm])
            isUsernameValid(reqBody.username)
            isEmailValid(reqBody.email)
            isPasswordValid(reqBody.password, reqBody.confirm)
            await checkIfEmailExists(reqBody.email)
            let [isUsernameTaken, isEmailTaken] = await ifUserExists(reqBody.username, reqBody.email)
            if(isUsernameTaken){
                throw new Error('Username is already taken...')
            }
            else if(isEmailTaken){
                throw new Error('Email is already taken...')
            }
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