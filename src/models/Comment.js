const {Schema, model, Types} = require('mongoose')

const commentSchema = new Schema({
     content : {
        type : String,
        required: [true, 'Comment must have some content !']
     },
    author : {
        type: Types.ObjectId,
        ref: 'User'
    }
})

const Comment = model('Comment', commentSchema)
exports.Comment = Comment