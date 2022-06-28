const User = require('../models/User')
const bcrypt = require('bcrypt')

const registerUser = async (username, password) => {
    let hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
    return User.create({
        username,
        password: hash
    })
}

module.exports = {
    registerUser
}