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
    messageServices.markAsRead(req.body, req.params.userId)
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
      console.log(err)
      res.status(500).json({message : 'Sorry, couldn\'t get the communcation data'})
    }
})

router.get('/check-new/:userId', (req, res) => {
  messageServices.checkForNew(req.params.userId, req.query.count, req.query.contactId)
  .then(newMessages => res.json(newMessages))
  .catch(err => res.status(500).json({message : 'Sorry, couldn\'t check for new messages...'}))
})

module.exports = router