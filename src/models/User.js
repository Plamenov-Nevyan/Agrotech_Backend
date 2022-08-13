const {Schema, model, Types, ObjectId} = require('mongoose')

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
    default : `https://drive.google.com/uc?export=view&id=1iMt8_whGlwVVfGofzNKVf7O9bwrNdjnt`
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
 links : {},
  publicationsCreated : [
    {
      type: Types.ObjectId,
      ref: 'Publication'
    }
  ],
  productsBought : [{
    publication : {},
    quantityBought : {type : Number}
  }],
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
  messages: [{
      _id : {type : String},
      sender : {
        type : Types.ObjectId,
        ref : 'User'
      },
      receiver : {
        type : Types.ObjectId,
        ref : 'User'
      },
      content : {type : String},
      msgType : {type : String},
         read : {type : Boolean},
      createdAt : {type : Date, default : Date.now()}
  }]
})

const User = model('User', userSchema)
exports.User = User