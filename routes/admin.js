const express = require('express')
const router = express.Router()
const models = require('../models')
const Cigar = models.Cigar

router.get('/', function(req,res){
    res.render('homeAdmin.ejs')
})

router.get('/adminTable', (req,res) => {
    Cigar.findAll()
    .then((dataCigar) => {
        res.render('adminTable.ejs', {dataCigar:dataCigar})
    })
  })

router.get('/adminTable/addStock', function(req,res){
    res.render('addCigar.ejs')
})

router.post('/adminTable/addStock', function(req,res){
    Cigar.create({
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock
    })
    .then(function(){
        res.redirect('/admin/admintable/')
    })
})

router.get('/adminTable/edit/:id', function(req,res){
    Cigar.findById(req.params.id)
    .then((dataCigar)=>{
        res.render('editCigar.ejs', {dataCigar:dataCigar})
    })
})

router.post('/adminTable/edit/:id', function(req,res){
    Cigar.update({
        name:req.body.name,
        price:req.body.price,
        stock:req.body.stock
    },{
        where: {id:req.params.id}
    })
    .then(()=>{
        res.redirect('/admin/adminTable')
    })
})

router.get('/adminTable/delete/:id',function(req,res){
    Cigar.destroy({
        where: {id:req.params.id}
    })

    .then(function(){
        res.redirect('/admin/adminTable')
    })

})
 
module.exports = router