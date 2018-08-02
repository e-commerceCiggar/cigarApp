const express = require('express')
const router = express.Router();
const Model = require('../models');
const ejs = require('ejs');
const bcrypt = require('bcrypt');

router.get('/', (req,res) => {
    res.render('dashboard')
})

module.exports = router