const createValidators = require('../utils/createValidators')

module.exports = (req, res,next) => {
    try{
        validatorHandlers[req.body.publicationType](req.body)
        next()
    }catch(err){
        res.status(400).send({message: err.message})
    }

} 

const validatorHandlers = {
    'product' : function(createData){
        try{
            createValidators.isNameValid(createData.name)
            createValidators.isPriceValid(createData.price)
            createValidators.isQuantityValid(createData.quantity)
            createValidators.isDosageValid(createData.dosage)
            createValidators.isProducedByValid(createData.producedBy)
            createValidators.isDescriptionValid(createData.description)
        }catch(err){
            throw err
        }
    },
    'vehicle': function(createData){
        try{
            createValidators.isModelValid(createData.model)
            createValidators.isBrandValid(createData.brand)
            createValidators.isPriceValid(createData.price)
            createValidators.areHorsePowersValid(createData.horsePowers)
            createValidators.areKilometersValid(createData.kilometers)
            createValidators.isDescriptionValid(createData.description)
        }catch(err){
            throw err
        }
    },
    'inventory': function(createData){
        try{
            createValidators.isModelValid(createData.model)
            createValidators.isBrandValid(createData.brand)
            createValidators.isPriceValid(createData.price)
            createValidators.isDescriptionValid(createData.description)
        }catch(err){
            throw err
        }
    },
    'service': function(createData){
        try{
            createValidators.isPriceValid(createData.price)
            createValidators.isDescriptionValid(createData.description)
        }catch(err){
            throw err
        }
    },
    'other': function(createData){
        try{
            createValidators.isNameValid(createData.name)
            createValidators.isPriceValid(createData.price)
            createValidators.isQuantityValid(createData.quantity)
            createValidators.isDescriptionValid(createData.description)
        }catch(err){
            throw err
        }
    }
}