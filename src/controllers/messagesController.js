const router = require('express').Router()
const messageServices = require('../services/messagesService')

router.get('/get-recent/:userId', async (req, res) => {
  try {
    let messages = await messageServices.getRecent(req.params.userId)
    res.json(messages)
  }catch(err){
    res.status(400).json({message : 'Sorry, couldn\'t get your messages'})
  }
})

router.post('/read/:userId', (req, res) => {
    messageServices.markAsRead(req.body.data, req.params.userId)
    .then(updatedMessages => res.json(updatedMessages))
    .catch(err => res.status(400).json({message : 'Sorry, couldn\'t get your messages..'}))
})

router.post('/send/:userId', async (req, res) => {
    try{
      await messageServices.sendMessage(req.body, req.params.userId)
      res.status(200).end()
    }catch(err){
      res.status(400).json({message : 'Sorry, couldn\'t send your message, try again please.'})
    }
})

router.get('/get-recent-chat/:userId', async (req, res) => {
    try{
      let messages = await messageServices.getRecentUnique(req.params.userId)
    res.json(messages)
  }
  catch(err){
    res.status(500).json({message : 'Sorry, couldn\'t get your messages..'})
  }
})

router.get('/get-transcript/:contactId/:userId', async(req, res) => {
    try{
      let transcript = await messageServices.getTranscript(req.params.contactId, req.params.userId)
      res.json(transcript)
    }catch(err){
      res.status(500).json({message : 'Sorry, couldn\'t get the communcation data'})
    }
})

router.post('/contact-by-email', (req, res) => {
   try{
    let resp = messageServices.sendEmail(req.body.sender, req.body.subject, req.body.content)
    res.json(resp)
  }
   catch(err) {
    res.status(400).json({message : 'Ooops, something went wrong.. try sending an email again please !'})
  }
})

module.exports = router