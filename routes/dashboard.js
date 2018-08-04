const express = require('express')
const router = express.Router();
const Model = require('../models');
const ejs = require('ejs');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: 'f0a120e0',
  apiSecret: '2om8azuM0DZuo0Xv'
});

router.get('/', (req,res) => {
    Model.Cigar.findAll()
    .then(function(cigarData){
        res.render('dashboard.ejs',{cigarData:cigarData})  
    })
})

router.get('/transaction/:id', (req, res) => {
    Model.Cigar.findOne({
        where: {id: req.params.id}
    })
    .then((dataCigar) => {
        Model.Client.findOne({
            where: {email: req.session.email}
        })
        .then((dataClient) => {
            res.render('transaction', {dataClient: dataClient, dataCigar: dataCigar})
        })
    })
})

router.post('/transaction/:id', (req, res) => {

    Model.Cigar.findOne({
        include: [Model.Client]
    })

    .then((dataCigar) => {
        Model.Client.findOne({
            inclue: [Model.Cigar]
        })
        .then((dataClient) => {
            Model.Transaction.create({
                CigarId: req.params.id,
                ClientId: req.session.UserId,
            })
            .then(() => {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: true,
                    auth: {
                      user: 'hacktiv8andresudi@gmail.com',
                      pass: 'hacktiv8Super'
                    }
                  })
              
                  const mailOptions = {
                    from: '"cigar store" <hacktiv8andresudi@gmail.com>',
                    to: req.session.email,
                    subject: 'receipt invoice',
                    text: `Halo ${req.session.firstName} ${req.session.lastName}! ini rokok ${dataCigar.name} yang anda beli\n dengan harga Rp.${dataCigar.price}\n bayar nya tanggal segini ya ${dataCigar.createdAt}.Terimakasih!`
                  }
                
                  transporter.sendMail(mailOptions, function(err, info) {
                    if (err)
                    console.log(err)
                    else
                    console.log(info)
                  })
              
                  Model.Transaction.create({
                      ClientId: req.session.UserId,
                      CigarId : req.params.id
                  })
                  .then(() => {
                      res.redirect('/dashboard')
                      Model.Transaction.findAll()
                      .then((dataTransaction) => {
                        setTimeout(function() {
                            const from = 'Nexmo';
                            const to = '+628119780702';
                            const text = 'anda harus melakukan pembayaran paling lambat h-1 dari transaction date';

                            nexmo.message.sendSms(from, to, text, (error, response) => {
                                if(error) {
                                    throw error;
                                } else if(response.messages[0].status != '0') {
                                    console.error(response);
                                    throw 'Nexmo returned back a non-zero status';
                                } else {
                                    console.log(response);
                                }
                            });
                        }, 2000)
                        res.render('transaction', {dataClient: dataClient, dataCigar:dataCigar, dataTransaction:dataTransaction})
                      })
                  })
                  .catch((err) =>{
                      console.log(err.message)
                  })
            })
            .catch(err => {
                res.send(err)
            })
        })
    })
})

module.exports = router