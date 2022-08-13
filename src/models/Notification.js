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
    deletedPublication : {},
    read : {
        type : Boolean
    },
    publicationsToBuy : [],
    expireAt: {
        type: Date,
        default: new Date(),
        expires: 172800,
    }
}, {timestamps:true})

const Notification = model('Notification', notificationSchema)
exports.Notification = Notification