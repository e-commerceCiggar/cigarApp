const express = require('express')
const router = express.Router()
const models = require('../models')
const Cigar = models.Cigar

router.get('/', function(req,res){
    Cigar.findAll()
    .then(function(cigarData){
        res.render('index.ejs',{cigarData:cigarData})  
    })
})

module.exports = router