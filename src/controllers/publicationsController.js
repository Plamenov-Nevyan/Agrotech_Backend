const router = require('express').Router()
const createServices = require('../services/createServices')

router.post('/create', async (req,res) => {
  try{
    req.body.owner = req.user._id
    let newPublication = await createServices.createPublication(req.body, req.body.publicationType)
    res.json(newPublication)
  }catch(err){
    res.json({message: err.message})
  }
})

module.exports = router