const {User} = require('../models/User')
const {v4 : uuidv4} = require('uuid')

const getRecent = async (userId) => {
    let user = await User.findById(userId).populate({
        path : 'messages',
        populate : {
            path : 'sender',
            model : 'User'
        }
    })
    let messages 
   if(user.messages.length > 0){
    messages = user.messages
      .filter(message => message.msgType === 'received')
      .sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    messages.length >= 5 ? messages = messages.slice(0, 5) : messages
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
     
      user.messages.forEach(message => {  
        if(messagesId.includes(message._id)){
        message.read = true
        }
    }
 )
 await user.save()
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
    let isAddedAlready = messagesFiltered.some(messageFiltered => 
      messageFiltered.sender._id === message.sender._id || messageFiltered.receiver._id === message.receiver._id
      )
    if(!isAddedAlready){
        messagesFiltered.push(message)
    }
  })

 return messagesFiltered
}

const getTranscript = async (contactId, userId) => {
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
}

const checkForNew = async (userId, currentCount, contactId) => {
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
   user.messages = user.messages.filter(message => message.sender._id == contactId || message.receiver._id == contactId)
   console.log(user.messages.length)
   console.log(currentCount)
   let areThereNew = user.messages.length > currentCount 
   return areThereNew ? user.messages.slice(currentCount) : []
}

module.exports = {
    getRecent, 
    markAsRead,
    sendMessage,
    getRecentUnique,
    getTranscript,
    checkForNew
}