const router = require('express').Router()
const publicationServices = require('../services/publicationServices')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage:storage})

router.post('/create', upload.single('upload'), async (req,res) => {
  try{
    req.body.owner = req.user._id
    let newPublication = await publicationServices.createPublication(req.body, req.file)
    res.json(newPublication)
  }catch(err){
    res.json({message: err.message})
  }
})
router.get('/marketplace', async (req, res) => {
if(Object.values(req.query).length > 0){
      if(req.query.hasOwnProperty('count')){
        try{
          let count = publicationServices.getTotalCount()
          res.json(count)
        }catch(err){
          res.json({message: err.message})
        }
      }
      else{
        try{ 
          let publicationsData =  await publicationServices.getLimitedPublications(req.query)
          res.json(publicationsData)
        }catch(err){
          res.json({message: err.message})
        }
        
      }
}
else{
  let publications = publicationServices.getAllPublications()
  res.json(publications)
}
})
router.get('/marketplace/:publicationId', async (req, res) => {
  try{ 
    let publication = await publicationServices.getPublicationDetails(req.params.publicationId)
   res.json(publication)
  }
  catch(err){
    res.json({message : 'Couldn\'t find this publication...'})
  }
})
router.post('/like/:publicationId', async (req, res) => {
 try{
   let publication = await publicationServices.likeOrFollowPublication( req.body.action, req.params.publicationId, req.body.userId)
   req.body.action === 'like' ? res.json(publication.likedBy) : res.json(publication.followedBy)
 }catch(err){
  res.json({message:err.message})
 }
})

module.exports = router