const {Publication} = require('../models/Publication')
const uploadFile = require('../utils/googleUpload')

const createPublication = async (publicationData, publicationImage) => {
    uploadFile(publicationImage)
        .then(async (resp) => {
            let imageLink = `https://drive.google.com/uc?export=view&id=${resp.data.id}`
            let publication = await Publication.create({
                name: publicationData.name,
                price: publicationData.price,
                quantity: publicationData.quantity,
                description: publicationData.description,
                image: imageLink,
                owner: publicationData.owner,
            })
            return publication
        })
        .catch(err => console.log(err))
}

module.exports = {
    createPublication,
    uploadFile
}