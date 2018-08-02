const logout = require('express').Router();
const Model = require('../models');
const ejs = require('ejs');
const bcrypt = require('bcrypt');

logout.get('/', (req,res) => {
    req.session.destroy()
    res.redirect('/')
})

module.exports = logout