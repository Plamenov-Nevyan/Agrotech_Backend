const {Publication} = require('../models/Publication')
const {Notification} = require('../models/Notification')
const {User} = require('../models/User')
const {Comment} = require('../models/Comment')
const uploadFile = require('../utils/googleUpload')
const {sortPublications} = require('../utils/sortPublications')
const removeFromFollowedAndLiked = require('../utils/removeFromFollowedAndLiked')

const createPublication = async (publicationData, publicationImage) => {
    uploadFile(publicationImage)
        .then(async (resp) => {
            let imageLink = `https://drive.google.com/uc?export=view&id=${resp.data.id}`
            let [publication, user] = await Promise.all([
              Publication.create({
                ...publicationData,
                image:imageLink
            }),
            User.findById(publicationData.owner)
            ])
            user.publicationsCreated.push(publication._id)
            await user.save()
        })
        .catch(err => {throw err})
}

const editPublication = async (publicationData, publicationImage, publicationId) => {
   if(publicationImage){
     uploadFile(publicationImage)
     .then(async (resp) => {
      let imageLink = `https://drive.google.com/uc?export=view&id=${resp.data.id}`
      let publication = await Publication.findByIdAndUpdate({
          ...publicationData,
          image:imageLink
      })
  })
  .catch(err => {throw err})
}
else {
  delete publicationData.followedBy
  delete publicationData.owner
   try {
    let publication = await Publication.findByIdAndUpdate(publicationId, {
        ...publicationData
    })
   }
   catch(err){
    throw err
   }
  }
}

const deletePublication = async (publicationId) => {
  try { 
    let publicationToDelete = await Publication.findById(publicationId)
   await Promise.all([
    removeFromFollowedAndLiked(publicationToDelete),
    Notification.deleteMany({forPublication : publicationId}),
    Publication.findByIdAndRemove(publicationId)
   ])
   return publicationToDelete
  }catch(err){
    throw err
  }
}

const getAllPublications = () => Publication.find().lean()

const getLimitedPublications = async (query) => {
   let sortParameters = sortPublications(query.sort)
   let noMoreRemaining = false
   let count = query.category ? await getTotalCount(query.category, '') : await getTotalCount('',query.search)
   count =  count - Number(query.skip)
   let publications

  if(count <= Number(query.limit)){
    if(query.category){
          publications =  query.category !== 'all'
          ? await Publication.find({publicationType: query.category})
          .skip(Number(query.skip))
          .lean() 
          : await Publication.find()
          .skip(Number(query.skip))
          .lean()
    }
    else if (query.search){
          publications = await Publication.find({$or :[
            {name: {$regex : `${query.search}`, $options : 'i'}},
            {model: {$regex : `${query.search}`, $options : 'i'}},
            {serviceType: {$regex : `${query.search}`, $options : 'i'}},
          ]})
          .skip(Number(query.skip))
          .lean()
    }
    count = 0
    noMoreRemaining = true
  }
  else{
    if(query.category){
          publications = query.category !== 'all'
          ? await Publication.find({publicationType: query.category})
          .skip(Number(query.skip)).limit(Number(query.limit))
          .lean()
          : await Publication.find()
          .sort(sortParameters)
          .skip(Number(query.skip))
          .limit(Number(query.limit)).lean()
      
    }
    else if(query.search){
          publications = await Publication.find({$or :[
            {name: {$regex : `${query.search}`, $options : 'i'}},
            {model: {$regex : `${query.search}`, $options : 'i'}},
            {serviceType: {$regex : `${query.search}`, $options : 'i'}},
          ]}).skip(Number(query.skip)).limit(Number(query.limit)).lean()
    }
    count = count - publications.length
  }

   return({publications, count, noMoreRemaining})
}

const getTotalCount = async(category, search) => {
try {
  let count 
  if(category){
      if(category !== 'all'){
         count = await  Publication.countDocuments({publicationType:category}).exec()}
      else {count = await  Publication.countDocuments().exec()
        
      }
  }
  else if(search){
    // count = await Publication.countDocuments({$text:{$search:search}})
    count = await Publication.countDocuments({$or :[
      {name: {$regex : `${search}`, $options : 'i'}},
      {model: {$regex : `${search}`, $options : 'i'}},
      {serviceType: {$regex : `${search}`, $options : 'i'}},
    ]}).exec()
  }
  return count
 }
 catch(err){
    throw err
 }
}

const getPublicationDetails = async(publicationId) => {
   let publication = await Publication.findOne({_id:publicationId})
   .populate('owner')
   .populate('likedBy')
   .populate('followedBy')
   .populate('comments')
   .populate({
    path: 'comments',
    populate: {
      path: 'author',
      model: 'User'
    }
   })
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

const addComment = async(publicationid, commentData) => {
  let [publication, user, newComment] = await Promise.all([
    Publication.findOne({_id : publicationid}),
    User.findOne({_id:commentData.author}),
    Comment.create({...commentData})
  ])

  publication.comments.push(newComment._id)
  user.comments.push(newComment._id)

  await Promise.all([
    publication.save(),
    user.save()
  ])

  return publication.populate({
    path: 'comments',
    populate: {
      path: 'author',
      model: 'User'
    }
  })
}

const getMostRecent = async() => {
  let publications = await Publication.find().sort({createdAt:-1}).limit(3)
  return publications
}

const getForShoppingCart = async(itemIds) => {
  try{
    let products = await Publication.find(
      {_id : {$in : itemIds}}
    ).populate('owner')
   
    return products
  }catch(err){
    throw err
  }
}

const getForSell = async(publicationIds) => {
  try{
    let products = await Publication.find(
      {_id : {$in : publicationIds}}
    ).populate('owner')
    return products
  }catch(err){
    throw err
  }
}

const sellProduct = async (productId, quantityToSell, buyerId) => {
 try{
  let [product, buyer] = await Promise.all([
    Publication.findById(productId),
    User.findById(buyerId)
  ])
  buyer.productsBought.push({
    publication : product,
    quantityBought : quantityToSell
 })
 await buyer.save()
    product.quantity = product.quantity - quantityToSell
    await product.save()
    return  product
    
 }catch(err){
  throw err
 }
}

module.exports = {
    createPublication,
    getAllPublications,
    getLimitedPublications,
    getTotalCount,
    getPublicationDetails,
    likeOrFollowPublication,
    addComment,
    getMostRecent,
    editPublication,
    deletePublication,
    getForShoppingCart,
    getForSell,
    sellProduct
}

