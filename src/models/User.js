const {Schema, model, Types} = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true
    },
  password : {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  phoneNumber : {
    type: Number
  },
  uic: {
    type: Number
  },
  publicationsCreated : [
    {
      type: Types.ObjectId,
      ref: 'Publication'
    }
  ],
  publicationsFollowed: [
         {
           type: Types.ObjectId,
           ref : 'Publication' 
         }
  ],
  publicationsLiked : [
    {
      type: Types.ObjectId,
      ref: 'Publication'
    }
  ], 
  notifications: [
    {type: Types.ObjectId,
     ref: 'Notification'
    }
  ],
  messages: [
    {type: Types.ObjectId,
     ref: 'Message'
    }
  ]
})

const User = model('User', userSchema)
exports.User = User