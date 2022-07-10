const {Publication} = require('../models/Publication')

const getAllPublications = () => Publication.find().lean()

module.exports = {
    getAllPublications
}