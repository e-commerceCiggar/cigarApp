const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'f0a120e0',
  apiSecret: '2om8azuM0DZuo0Xv'
});

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

Transaction.hook('beforeCreate', (user, options) => {
  const nodemailer = require('nodemailer')

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hacktiv8andresudi@gmail.com',
      pass: 'hacktiv8Super'
    }
  })

  const mailOptions = {
    from: '"cigar store" <hacktiv8andresudi@gmail.com>',
    to: 'andresudi@gmail.com',
    subject: 'receipt invoice',
    text: `test`
  }

  transporter.sendMail(mailOptions, function(err, info) {
    if (err)
    console.log(err)
    else
    console.log(info)
  })
})