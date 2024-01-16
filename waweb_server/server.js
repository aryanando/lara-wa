var express = require('express');
var app = express();

const { Client } = require('whatsapp-web.js');
const client = new Client();

var qrcode = '';

client.on('qr', (qr) => {
    qrcode = qr;
    console.log(qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

app.get('/', function(req, res){
   res.send(qrcode);
});

app.listen(3000);
