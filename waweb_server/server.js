var express = require('express');
var app = express();

const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

const { Client } = require('whatsapp-web.js');
const client = new Client();

var qrcode = 'false';

client.on('qr', (qr) => {
    qrcode = qr;
    console.log(qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

app.use(cors(corsOptions));
app.get('/', function (req, res) {
    res.json({ 'qr-token': qrcode });
});

app.listen(3000);
