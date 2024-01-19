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
var login_status = false;

client.on('qr', (qr) => {
    qrcode = qr;
    console.log(qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
    login_status = true;
});

client.initialize();

app.use(cors(corsOptions));
app.get('/', function (req, res) {
    if (login_status) {
        res.json({ 'login_status': login_status });
    }else{
        res.json({ 'qr-token': qrcode, 'login_status': login_status });
    }
});

app.listen(3000);
