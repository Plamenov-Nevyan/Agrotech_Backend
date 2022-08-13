require('dotenv').config({ path:'./src/config/.env'})
const app = require('express')()
const http = require('http')
const routes = require('./src/routes')
const isAuth = require('./src/middlewares/isAuth')
const cors = require('./src/middlewares/cors')
const dbConnect = require('./src/config/mongoDB')
const port = process.env.PORT || 5000


require('./src/config/express')(app)
app.use(cors)
app.use(isAuth)
app.use(routes)

let server = http.createServer(app)

dbConnect()
.then(() => app.listen(port, console.log(`Server running on port ${port}...`)))
.catch(err => console.log('The attempt of connecting to the database has failed...'))



