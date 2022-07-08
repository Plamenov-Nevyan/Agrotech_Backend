const {Schema, model, Types} = require('mongoose')

const serviceSchema = new Schema({
    name : {
        type: String,
        required: [true, 'Name of service offered is required !']
    },
    type : {
        type: String,
        required: [true, 'Type of service offered is required !']
    },
    price : {
        type: Number,
        required:[true, 'Service price is required !']
    },
    description : {
        type: String,
        required: [true, 'Service description is required !'],
        minlength: 20,
        maxlength: 200
    },
    image: {
        type: String,
        required: [true, 'Service image is required']
    },
    owner : {
        type: Types.ObjectId,
        ref: 'User'
    },
    followedBy : [
        {type: Types.ObjectId,
         ref: 'User'
        }
    ],
    likedBy : [
        {type: Types.ObjectId,
         ref: 'User'
        }
    ],
    comments : [
        {type: Types.ObjectId,
          ref: 'Comment'
        }
    ]
})

const AgroService = model('AgroService', serviceSchema)
exports.AgroService = AgroService