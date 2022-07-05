const {VehicleAndPart} = require('../models/Agro_Vehicle_Part')
const {Product} = require('../models/Product')
const {AgroService} = require('../models/Service')

const createPublication = async (publicationData, publicationType) => {
   try{
    if(publicationType === 'Agro-Vehicles/Parts'){
        let vehicleOrPart = await VehicleAndPart.create({
            brand: publicationData.brand,
            modelOrName: publicationData.model_or_name,
            price: publicationData.price,
            quantity: publicationData.quantity,
            description: publicationData.description,
            image: 'img.jpg'
        })
        return vehicleOrPart
    }
    else if(publicationType === 'Products/Others'){;
          let product = await Product.create({
            name: publicationData.name,
            type : publicationData.type,
            price: publicationData.price,
            quantity: publicationData.quantity,
            description: publicationData.description,
            image: 'img.jpg',
            owner: publicationData.owner
          })
          return product
    }
    else if(publicationType === 'Agro-Services'){
        let agroService = await AgroService.create({
            type: publicationData.serviceName,
            price: publicationData.price,
            description: publicationData.description,
            image: 'image.jpg'
        })
        return agroService
    }
   }
   catch(err){
    throw err
   }
}

module.exports = {
    createPublication
}