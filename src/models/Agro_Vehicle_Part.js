const {Schema, model, Types} = require('mongoose')

const vehiclesAndPartsSchema = new Schema({
    type: {
        type: String
    },
    brand : {
        type: String,
        required: [true, 'Vehicle/part brand is required !']
    },
    modelOrName : {
        type: String,
        required: [true, 'Vehicle model/Part name is required!']
    },
    price : {
        type: Number,
        required:[true, 'Vehicle/part price is required !']
    },
    quantity : {
        type: Number,
        required: [true, 'Vehicle/part\'s available quantity is required !']
    },
    description : {
        type: String,
        required: [true, 'Vehicle/part description is required !'],
        minlength: 20,
        maxlength: 200
    },
    image: {
        type: String,
        required: [true, 'Vehicle/part image is required']
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

const VehicleAndPart = model('VehiclesAndParts', vehiclesAndPartsSchema)
exports.VehicleAndPart = VehicleAndPart