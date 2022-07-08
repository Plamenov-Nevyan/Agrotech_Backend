const {Product} = require('../models/Product')
const {VehicleAndPart} = require('../models/Agro_Vehicle_Part')
const {AgroService} = require('../models/Service')

const getAllPublications = () => Promise.all([
    Product.find().lean(),
    VehicleAndPart.find().lean(),
    AgroService.find().lean()
])

module.exports = {
    getAllPublications
}