const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const index = require('./routes/index')
const register = require('./routes/register')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', index)
app.use('/register', register)

app.listen(3000, console.log('connect to port:3000'))