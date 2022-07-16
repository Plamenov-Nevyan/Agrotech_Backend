const {Publication} = require('../models/Publication')
const {User} = require('../models/User')
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

const getPublicationDetails = async(publicationId) => {
   let publication = await Publication.findOne({_id:publicationId})
   .populate('owner')
   .populate('likedBy')
   .populate('followedBy')
   .populate('comments')
   .lean()
return publication
}

const likeOrFollowPublication = async (action,publicationId, userId) => {
  let [publication, user] = await Promise.all([
    Publication.findOne({_id:publicationId}),
    User.findOne({_id:userId})
  ])
  
  if(action === 'like'){
  publication.likedBy.push(userId)
  user.publicationsLiked.push(publication._id)
  }
  else{
    publication.followedBy.push(userId)
    user.publicationsFollowed.push(publication._id)
  }
  
  await Promise.all([
    publication.save(),
    user.save()
  ]) 
  return action === 'like' ? publication.populate('likedBy') : publication.populate('followedBy')
}

module.exports = {
    createPublication,
    getAllPublications,
    getLimitedPublications,
    getTotalCount,
    getPublicationDetails,
    likeOrFollowPublication
}

