const router = require('express').Router()
const publicationServices = require('../services/publicationServices')
const commentServices = require('../services/commentServices')
const createValidator = require('../middlewares/createValidator')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage:storage})

router.post('/create', upload.single('upload'), createValidator,async (req,res) => {
    req.body.owner = req.user._id
  try{ 
    await publicationServices.createPublication(req.body, req.file)
    res.status(203).end()
  }catch(err){
    res.status(400).json({message: err.message})
  }
})

router.put('/edit/:publicationId',upload.single('upload'), createValidator, async (req, res) => {
  try{ 
    await publicationServices.editPublication(req.body, req.file, req.params.publicationId)
    res.status(203).end()
  }catch(err){
    res.status(400).json({message: err.message})
  }
})

router.delete('/delete/:publicationId', async (req, res) => {
  try {
    let publicationToDelete = await publicationServices.deletePublication(req.params.publicationId)
    res.json(publicationToDelete)
  }catch(err){
    res.status(500).json({message : 'Opps something went wrong, couldn\'t delete your publication...'})
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

router.get('/most-recent', async (req, res) => {
    try{
      let publications = await publicationServices.getMostRecent()
    res.json(publications)
    }
    catch(err){
      res.json({message: err.message})
    }
})

router.get('/get-for-shopping-cart', async (req, res) => {
  try{
    let products = await publicationServices.getForShoppingCart(req.query.itemIds.includes(',')
    ? req.query.itemIds.split(',')
    : req.query.itemIds
    )
    res.json(products)
  }catch(err){
    res.status(500).json({message : 'Something went wrong when retrieving your products, try to refresh the page !'})
  }
})

router.get('/get-for-sell', async (req, res) => {
  try{
    let publications = await publicationServices.getForSell(req.query.publicationIds.includes(',')
    ? req.query.publicationIds.split(',')
    : req.query.publicationIds
    )
    res.json(publications)
  }catch(err){
    res.status(500).json({message : 'Something went wrong when retrieving products for sell, try to refresh the page !'})
  }
})

router.post('/sell/:publicationId', async (req, res) => {
   try{
    let data = await publicationServices.sellProduct(req.params.publicationId, req.body.quantityToSell, req.body.buyer._id)
    res.json(data)
  }catch(err){
    res.status(500).json({message : 'Server was not able to process sell request, try again please!'})
  }
})


module.exports = router