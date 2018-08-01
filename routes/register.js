const express = require('express')
const router = express.Router()
const ejs = require('ejs')
const Model = require('../models/')

router.get('/', (req,res) => {
    res.render('register', { err: null})
})

router.post('/', (req, res) => {
    Model.Client.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        age: req.body.age,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    })
    .then(() => {
        res.redirect('/register')
    })
    .catch((err) => {
        res.render('register', {err: err.message})
    })
})

module.exports = router