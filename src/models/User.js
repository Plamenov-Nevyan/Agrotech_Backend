const {Schema, model} = require('mongoose')

const userSchema = ({
    username: {
        type: String,
        required: true,
    },
  password : {
    type: String,
    required: true
  }
})

const User = model('User', userSchema)
exports.User = User