const {Schema, model, Types} = require('mongoose')

const messageSchema = new Schema({
     content : {
        type : String,
        required: [true, 'Message must have some content !']
     },
    sender : {
        type: Types.ObjectId,
        ref: 'User'
    }
})

const Message = model('Message', messageSchema)
exports.Message = Message