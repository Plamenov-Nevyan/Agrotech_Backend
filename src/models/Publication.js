const {Schema, model, Types} = require('mongoose')

const publicationSchema = new Schema({
    name : {
        type: String,
        required: [true, 'Product name is required !']
    },
    price : {
        type: Number,
        required:[true, 'Product price is required !']
    },
    quantity : {
        type: Number,
        required: [true, 'Product\'s available quantity is required !']
    },
    description : {
        type: String,
        required: [true, 'Product description is required !'],
        minlength: 20,
        maxlength: 200
    },
    image: {
        type: String,
        required: [true, 'Product image is required']
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
    ],
    
},
{timestamps: true}
)

const Publication = model('Publication', publicationSchema)
exports.Publication = Publication