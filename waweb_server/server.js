var express = require('express');
var app = express();

const cors = require("cors");

const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

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

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.get('/', function (req, res) {
    if (login_status) {
        res.json({ 'login_status': login_status });
    } else {
        res.json({ 'qr-token': qrcode, 'login_status': login_status });
    }
});

app.get('/send', function (req, res) {
    client.isRegisteredUser("6289675171190@c.us").then(function (isRegistered) {
        if (isRegistered) {
            client.sendMessage("6289675171190@c.us", "hello");
            res.json({ 'message': 'Message send !!!' });
        }
    });
});

app.listen(3000);
