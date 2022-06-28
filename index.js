require('dotenv').config({ path:'./src/config/.env'})
const app = require('express')()
const routes = require('./src/routes')
const dbConnect = require('./src/config/mongoDB')
const port = process.env.PORT || 3000

require('./src/config/express')(app)

app.use(routes)

dbConnect()
.then(() => app.listen(port, console.log(`Server running on port ${port}...`)))
.catch(err => console.log('The attempt of connecting to the database has failed...'))
