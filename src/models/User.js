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
  publicationsFollowed: [
         {
           type: Types.ObjectId,
           refPath : 'publicationModel' 
         }
  ],
  publicationModel : {
    type: String,
    enum: ['Agro_Vehicles_Parts', 'Products', 'Services']
  },
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