const {Schema, model, Types} = require('mongoose')

const notificationSchema = new Schema({
    type : {type : String},
   content : {type : String},
    sender : {
        type: Types.ObjectId,
        ref: 'User'
    },
    receiver : {
        type: Types.ObjectId,
        ref: 'User'
    },
    forPublication : {
        type: Types.ObjectId,
        ref: 'Publication'
    },
    read : {
        type : Boolean
    },
    expireAt: {
        type: Date,
        default: new Date(),
        expires: 172800,
    }
}, {timestamps:true})

const Notification = model('Notification', notificationSchema)
exports.Notification = Notification