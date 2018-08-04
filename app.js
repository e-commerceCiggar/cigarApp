const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')

const index = require('./routes/index')
const register = require('./routes/register')

const login = require('./routes/login')
const dashboard = require('./routes/dashboard')
const logout = require('./routes/logout')
const admin = require('./routes/admin.js')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.locals.formatMoney = require('./helper/changeFormatMoney')

app.use(session({
    secret: "pair project",
    resave: false,
    saveUninitialized: false,
}))

app.use('/', index)

var sessionChecker1 = ((req, res, next) => {
    if (req.session.email) {
        next()
    } else {
        res.redirect('/')
    }
})

var sessionChecker2 = ((req, res, next) => {
    if(req.session.role == 'User') {
       next()
    } else {
       res.redirect('/')
    }
})

var sessionChecker3 = ((req, res, next) => {
    if(req.session.role == 'Admin') {
       next()
    } else {
       res.redirect('/')
    }
})

app.use('/register', register)
app.use('/login', login)
app.use('/admin',sessionChecker1,sessionChecker3,admin)
app.use('/dashboard', sessionChecker1, sessionChecker2, dashboard)
app.use('/logout', sessionChecker1, logout)

app.listen(3000, console.log('connect to port:3000'))
