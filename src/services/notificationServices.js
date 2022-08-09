const {Notification} = require('../models/Notification')
let infoBoxNotificationsCount = 5

const sendNotification = (data) => {
      return Notification.create(data)
}

const getUserNotifications = (userId) => {
    return Notification.find({receiver:userId}).sort({createdAt: 'desc' }).limit(infoBoxNotificationsCount).populate('sender')
}

const getUserNotificationsOnLoad = async (userId, queryParams) => {
    let noMoreRemaining = false
    let count = await getTotalCount(userId)
    count = count - Number(queryParams.skip)
    let notifications
    if(count <= Number(queryParams.limit)){
      notifications = await Notification.find({receiver:userId})
      .sort({createdAt: queryParams.sort})
      .skip(Number(queryParams.skip))
      .populate('sender')
      .populate('forPublication')
      .lean()
      count = 0
      noMoreRemaining = true
    }
    else{
        notifications = await Notification.find({receiver : userId})
        .sort({createdAt : queryParams.sort})
        .skip(Number(queryParams.skip))
        .limit(Number(queryParams.limit))
        .populate('sender')
        .populate('forPublication')
        .lean()
        count = count - notifications.length
      }
       return({notifications, count, noMoreRemaining})
}

const markAsRead = async (notificationsId, userId) => {
  console.log(notificationsId)
   await Notification.updateMany(
        { _id: { $in: notificationsId } },
        { $set: { read : true } },
     )
     return getUserNotifications(userId)
}

const getTotalCount = (userId) => Notification.countDocuments({receiver : userId}).exec()

module.exports = {
    sendNotification,
    getUserNotifications,
    getUserNotificationsOnLoad,
    markAsRead
}