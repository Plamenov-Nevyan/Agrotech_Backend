const router = require('express').Router()
const commentServices = require('../services/commentServices')

router.post('/add/:publicationId', (req, res) => {
    commentServices.addComment(req.params.publicationId, req.body)
    .then((newComment) => res.json(newComment))
    .catch(err => res.status(500).json({message : 'Couldn\'t add the comment to the server'}))
 })
router.get('/get/:publicationId', (req, res) => {
    let {skip, limit, sort} = req.query
    commentServices.getComments(skip, limit,sort, req.params.publicationId)
    .then(commentsData => res.json(commentsData))
    .catch(err => res.status(500).json({message : 'Couldn\'t get available comments from the server'}))
 })
 router.get('/count/:publicationId', (req, res) => {
    commentServices.getCommentsCount(req.params.publicationId)
    .then(count => res.json(count))
    .catch(err => res.status(500).json({message : 'Sorry, something went wrong...'}))
 })

module.exports = router