const router = require('express').Router()
const notificationServices = require('../services/notificationServices')

router.post('/send', (req, res) => {
  notificationServices.sendNotification(req.body)
  .then((notification) => res.json({message : `notification sent successfully`}))
  .catch(err => res.status(400).json({message:`Ooops.. couldn't send the notification..`}))
})

router.get('/get-recent/:userId', (req,res) => {
   notificationServices.getUserNotifications(req.params.userId)
   .then((notifications) => res.json(notifications))
   .catch(err => res.status(400).json({message:'Sorry, couldn\'t get your notifications..'}))
})

router.get('/get-all/:userId', (req,res) => {
   notificationServices.getUserNotificationsOnLoad(req.params.userId, req.query)
   .then((notifications) => res.json(notifications))
   .catch(err => {console.log(err);res.status(400).json({message:'Sorry, couldn\'t get your notifications..'})})
}),

router.post('/read/', (req, res) => {
   console.log(req.body)
   notificationServices.markAsRead(req.body) 
   .then(updatedNotifications => {
      res.json(updatedNotifications)
   })
   .catch(err => res.status(400).end())
})

module.exports = router