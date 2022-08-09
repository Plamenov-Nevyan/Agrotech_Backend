const jwt = require('jsonwebtoken')
const {checkIfTokenIsRevoked} = require('../services/authServices')

module.exports = (req, res, next) => {
    let accessToken = req.headers['x-authorization']
    if(accessToken){
        checkIfTokenIsRevoked(accessToken) 
        .then((isRevoked) => {
            if(isRevoked){res.status(403).json({message:'The attempted action is unauthorized !'})}
            jwt.verify(accessToken, process.env.JWT_SECRET, function(err, payload){
                if(err){res.status(403).json({message:err.message})}
                req.user = {
                    username : payload.username,
                    email: payload.email,
                    _id: payload._id,
                    accessToken
                }
             
            })
            if(req.path === '/logout'){req.token = accessToken}
            next()
        })
    .catch(err => res.status(500).json({message: 'Sorry, an internal error has occured'})) 
    }
    else {
        next()
    }
    
}