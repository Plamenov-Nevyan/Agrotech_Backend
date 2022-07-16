const {Publication} = require('../models/Publication')
const uploadFile = require('../utils/googleUpload')
const {sortPublications} = require('../utils/sortPublications')

const createPublication = async (publicationData, publicationImage) => {
    uploadFile(publicationImage)
        .then(async (resp) => {
            let imageLink = `https://drive.google.com/uc?export=view&id=${resp.data.id}`
            let publication = await Publication.create({
                ...publicationData,
                image:imageLink
            })
        })
        .catch(err => console.log(err))
}
const getAllPublications = () => Publication.find().lean()

const getLimitedPublications = async (query) => {
   let noMoreRemaining = false
   let count = await getTotalCount()
   count = count - Number(query.skip)
   let publications
  if(count <= Number(query.limit)){
    publications =  await Publication.find().skip(Number(query.skip)).lean(),
    count = 0
    noMoreRemaining = true
  }
  else{
    publications =  await Publication.find().skip(Number(query.skip)).limit(Number(query.limit)).lean(),
    count = count - publications.length
  }
   return({publications, count, noMoreRemaining})
}

const getTotalCount = async() => {
    let count = await  Publication.countDocuments().exec()
    return count
}

module.exports = {
    createPublication,
    getAllPublications,
    getLimitedPublications,
    getTotalCount
}

// { count: '' }
// { skip: '0', limit: '8', sort: 'recent' }

