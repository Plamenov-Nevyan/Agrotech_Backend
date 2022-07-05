const {Schema, model, Types} = require('mongoose')

const notificationSchema = new Schema({
    type : {
        type : String,
        required: [true, 'Must be that someone liked or followed a publication!']
    },
    sender : {
        type: Types.ObjectId,
        ref: 'User'
    }
})

const Notification = model('Notification', notificationSchema)
exports.Notification = Notification