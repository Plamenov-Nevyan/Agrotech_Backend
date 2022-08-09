require('dotenv').config({ path:'./src/config/.env'})
const notificationServices = require('./src/services/notificationServices')
const socketIo = require("socket.io")
const app = require('express')()
const http = require('http')
const routes = require('./src/routes')
const isAuth = require('./src/middlewares/isAuth')
const cors = require('./src/middlewares/cors')
const dbConnect = require('./src/config/mongoDB')
const port = process.env.PORT || 5000
const usersConnected = {}


require('./src/config/express')(app)
app.use(cors)
app.use(isAuth)
app.use(routes)

let server = http.createServer(app)
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})
io.on("connection", socket => {
    const user = {}
    user.socketId = socket.id
    socket.on('disconnect', () => {
        Object.values(usersConnected).forEach(user => {
            if(user.socketId === socket.id){delete usersConnected[user]}
        })
    })
    
    socket.on('user-data-sent', userData => {
        user._id = userData._id
        user.username = userData.username
        usersConnected[user._id] ? null : usersConnected[user._id] = user
    })

    socket.on('message-sent', message => {
        if(usersConnected.hasOwnProperty(message.receiver)){
            io.to(usersConnected[message.receiver].socketId).emit('message-received', 'hello')
        }
    })
})
dbConnect()
.then(() => server.listen(port, console.log(`Server running on port ${port}...`)))
.catch(err => console.log('The attempt of connecting to the database has failed...'))



