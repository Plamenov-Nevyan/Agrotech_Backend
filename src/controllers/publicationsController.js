const router = require('express').Router()
const createServices = require('../services/createServices')
const getServices = require('../services/getServices')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage:storage})

router.post('/create', upload.single('upload'), async (req,res) => {
  try{
    req.body.owner = req.user._id
    let newPublication = await createServices.createPublication(req.body, req.file)
    res.json(newPublication)
  }catch(err){
    res.json({message: err.message})
  }
})
router.get('/marketplace', async (req, res) => {
  try{ 
    let [Products, VehiclesAndParts, Services] = await getServices.getAllPublications()
    console.log(Products)
    let allPublications = Products.concat(VehiclesAndParts, Services)
    res.json(allPublications)
  }catch(err){
    res.json({message: err.message})
  }
   
})

module.exports = router