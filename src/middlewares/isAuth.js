const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    let accessToken = req.headers['x-authorization']
    if(accessToken){
        let payload = jwt.verify(accessToken, process.env.JWT_SECRET)
        req.user = {
            username : payload.username,
            email: payload.email,
            _id: payload._id,
            accessToken
        }
    }
    next()
}