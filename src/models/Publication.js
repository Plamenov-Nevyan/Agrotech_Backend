const {Schema, model, Types} = require('mongoose')
const {Comment} = require('./Comment')

const publicationSchema = new Schema({
    publicationType : {
        type: String,
        required: [true, 'Publication type is required.. !']
    },
    name : {
        type: String,
    },
    price : {
        type: Number,
    },
    quantity : {
        type: Number,
    },
    description : {
        type: String,
        minlength: 20,
        maxlength: 200
    },
    image: {
        type: String,
        required: [true, 'Product image is required']
    },
    productType : {
        type: String,
    },
    inventoryType: {
        type: String,
    },
    dosage: {
        type: String,
    },
    producedBy: {
        type: String,
    },
    model: {
        type: String,
    },
    brand: {
        type: String,
    },
    date: {
        type: String,
    },
    horsePowers: {
        type: Number,
    },
    kilometers: {
        type: Number,
    },
    serviceType: {
        type: String,
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
          ref: Comment
        }
    ],
    
},
{timestamps: true}
)

const Publication = model('Publication', publicationSchema)
exports.Publication = Publication