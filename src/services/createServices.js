const {VehicleAndPart} = require('../models/Agro_Vehicle_Part')
const {Product} = require('../models/Product')
const {AgroService} = require('../models/Service')
const uploadFile = require('../utils/googleUpload')

const createPublication = async (publicationData, publicationImage) => {
        uploadFile(publicationImage)
        .then(async (resp) => {
            let imageLink = `https://drive.google.com/uc?export=view&id=${resp.data.id}`
            if(publicationData.publType === 'Agro-Vehicles/Parts'){
                let vehicleOrPart = await VehicleAndPart.create({
                    brand: publicationData.brand,
                    modelOrName: publicationData.model_or_name,
                    price: publicationData.price,
                    quantity: publicationData.quantity,
                    description: publicationData.description,
                    type: publicationData.publType,
                    image: imageLink
                })
                return vehicleOrPart
            }
            else if(publicationData.publType === 'Products/Others'){;
                  let product = await Product.create({
                    name: publicationData.name,
                    type : publicationData.type,
                    price: publicationData.price,
                    quantity: publicationData.quantity,
                    description: publicationData.description,
                    image: imageLink,
                    owner: publicationData.owner
                  })
                  return product
            }
            else if(publicationData.publType === 'Agro-Services'){
                let agroService = await AgroService.create({
                    name: publicationData.serviceName,
                    type: publicationData.publType,
                    price: publicationData.price,
                    description: publicationData.description,
                    image: imageLink,
                    type: publicationData.publType
                })
                return agroService
            }
        })
    .catch(err => console.log(err))
}

module.exports = {
    createPublication,
    uploadFile
}