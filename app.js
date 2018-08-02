const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')

const index = require('./routes/index')
const register = require('./routes/register')
const admin = require('./routes/admin.js')
// const login = require('./routes/login')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: "pair project",
    resave: false,
    saveUninitialized: false,
}))

app.use('/', index)
app.use('/register', register)
app.use('/admin', admin)
// app.use('/login', login)

app.listen(3000, console.log('connect to port:3000'))