const {User} = require('../models/User')
const {v4 : uuidv4} = require('uuid')
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  port: 2525,
  secure: true,
  auth: {
    user: process.env.GoogleUsername,
    pass: process.env.GooglePass
  },
});

const getRecent = async (userId) => {
    let user = await User.findById(userId).populate({
        path : 'messages',
        populate : {
            path : 'sender',
            model : 'User'
        }
    }).populate({
      path : 'messages',
      populate : {
          path : 'receiver',
          model : 'User'
      }
  })
    let messages 
   if(user.messages.length > 0){
    messages = user.messages
      .filter(message => message.msgType === 'received')
      .filter(message => message.read === false)
      .sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    messages.length >= 10 ? messages = messages.slice(0, 10) : messages
   }
   else {messages = []}
   return messages
}

const markAsRead = async (messagesId, userId) => {
      let user = await User.findById(userId).populate({
        path : 'messages',
        populate : {
            path : 'sender',
            model : 'User'
        }
     }) 
     if(Array.isArray(messagesId)){
          user.messages.forEach(message => {  
            messagesId.includes(message._id)
              ? message.read = true
              : null
          })
     }
     else{
         let messageToMark = user.messages.find(message => message._id === messagesId)
         messageToMark.read = true
         let indexOfMsgToMark = user.messages.indexOf(messageToMark)
         user.messages.splice(indexOfMsgToMark, 1, messageToMark)
     }
 await user.save()

  user.messages = user.messages
  .filter(message => message.msgType === 'received')
  .filter(message => message.read === false)
  .sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  
  return user.messages
}

const sendMessage = async (data) => {
   let [receiver, sender] = await Promise.all([
    User.findById(data.receiver),
    User.findById(data.sender)
   ])
   receiver.messages.push({...data, msgType:'received', read : false, _id : uuidv4()})
   sender.messages.push({...data, msgType:'sent', _id : uuidv4()})
   await Promise.all([
    receiver.save(),
    sender.save()
   ])
}

const getRecentUnique = async (userId) => {
  let user = await User.findById(userId).populate({
    path : 'messages',
    populate : {
        path : 'sender',
        model : 'User'
    }
 })
 .populate({
  path : 'messages',
  populate : {
      path : 'receiver',
      model : 'User'
  }
})

 user.messages = user.messages.sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))

let messagesFiltered = []
  user.messages.forEach(message => {
    let isAddedAlready = messagesFiltered.some(messageFiltered => messageFiltered.receiver._id === message.receiver._id || messageFiltered.sender._id === message.sender._id 
          
      )

    if(!isAddedAlready){
        messagesFiltered.push(message)
    }
  })

 return messagesFiltered
}

const getTranscript = async (contactId, userId) => {
   try{
    let user = await User.findById(userId)
   .populate({
    path : 'messages',
    populate : {
        path : 'sender',
        model : 'User'
    }
 })
 .populate({
  path : 'messages',
  populate : {
      path : 'receiver',
      model : 'User'
  }
})

 let transcript = user.messages
 .filter(message => message.sender._id == contactId || message.receiver._id == contactId)
 .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))

 return transcript
  }catch(err){
    throw err
  }
}

const sendEmail = (sender, subject, content) => {
  let mailOptions = {
    from : sender,
    to : 'plamenovnevyan@gmail.com',
    subject : subject,
    html : `
    <h3>From : ${sender}</h3>
    <p>${content}</p>
    `
  }
try{  
  transporter.sendMail(mailOptions, (err, info) => {
    if(err){
        throw {message : err.message}
    }
  })
}catch(err){
  throw err
}
}


module.exports = {
    getRecent, 
    markAsRead,
    sendMessage,
    getRecentUnique,
    getTranscript,
    sendEmail
}