const {User} = require('../models/User')
const {Comment} = require('../models/Comment')


const addComment = async(publicationId, commentData) => {
    let [user, newComment] = await Promise.all([
      User.findOne({_id:commentData.author}),
      Comment.create({...commentData})
    ])
  
    newComment.forPublication = publicationId
    user.comments.push(newComment._id)
   
    await Promise.all([
      newComment.save(),
      user.save()
    ])
    return newComment.populate('author') 
}

const getComments =  async (skip, limit,sort, publicationId) => {
  let [comments, count] = await Promise.all([
    Comment.find({forPublication : publicationId})
    .skip(Number(skip))
    .limit(Number(limit))
    .sort({createdAt: sort === 'recent' ? 'desc' : 'asc'})
    .populate('author'),
    getCommentsCount(publicationId)
  ]) 
  return {comments, pages : Math.ceil(count / Number(limit))}
}

const getCommentsCount = async (publicationId) => {
   const count = await Comment.countDocuments({forPublication:publicationId}).exec()
   return count
}

module.exports = {
    addComment,
    getComments,
    getCommentsCount
}