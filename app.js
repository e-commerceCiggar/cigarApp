const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')

const index = require('./routes/index')
const register = require('./routes/register')
const login = require('./routes/login')
const dashboard = require('./routes/dashboard')
const logout = require('./routes/logout')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: "pair project",
    resave: true,
    saveUninitialized: true,
}))

app.use('/', index)

var sessionChecker1 = ((req, res, next) => {
    if(req.session.role == 'User') {
        console.log(`masuk 1`)
       next()
    } else {
       res.redirect('/')
    }
})

var sessionChecker2 = ((req, res, next) => {
    if (req.session.email) {
        console.log(`masuk 2`)
        next()
    } else {
        res.redirect('/')
    }
})

app.use('/register', register)
app.use('/login', login)
app.use('/dashboard', sessionChecker2, sessionChecker1, dashboard)
app.use('/logout', sessionChecker2, logout)

app.listen(3000, console.log('connect to port:3000'))