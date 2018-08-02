const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'f0a120e0',
  apiSecret: '2om8azuM0DZuo0Xv'
});

const from = 'Nexmo';
const to = '+628119780702';
const text = 'test hacktiv yak';

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