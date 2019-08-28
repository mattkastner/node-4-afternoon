require('dotenv').config()

const cors = require('cors')
const express = require('express')
const session = require('express-session')

const {checkUser} = require('./middlewares/checkForSession')
const swagCtrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authController')
const cartCtrl = require('./controllers/cartController')
const searchCtrl = require('./controllers/searchController')

const app = express()

const {SERVER_PORT, SESSION_SECRET} = process.env

app.use(cors())
app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}))

//homemade middleware
app.use(checkUser)

//endpoints
app.get("/api/swag", swagCtrl.read)

//auth endpoints
app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)

//cart endpoints
app.post('/api/cart/checkout', cartCtrl.checkout)
app.post('/api/cart/:id', cartCtrl.add)
app.delete('/api/cart/:id', cartCtrl.deleteUser)

//search endpoints
app.get("/api/search", searchCtrl.search);

app.listen(SERVER_PORT, () => {
    console.log(`Serving port ${SERVER_PORT}`)
})