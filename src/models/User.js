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
  image: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  shortDescription : {
    type: String,
  },
  about : {
    type: String,
  },
  phoneNumber : {
    type: Number
  },
  uic: {
    type: Number
  },
  gender : {
    type : String
  },
  location : {
    type : String
  },
  facebookLink : {
    type: String
  },
  tinderLink: {
    type: String
  },
  instagramLink : {
    type: String
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
  comments : [
    {
      type: Types.ObjectId,
      ref: 'Comment'
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