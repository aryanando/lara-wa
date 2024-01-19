console.log("its works!!!");

import QRCode from 'qrcode'
import axios from 'axios';
window.axios = axios;
window.QRCode = QRCode;

var canvas = document.getElementById('qr');


function getQr() {
    window.axios.get('http://localhost:3000/').then(res => {
        if (res.status == 200 && res.data['login_status']==false) {
            // console.log(res.data);
            window.QRCode.toCanvas(canvas, res.data['qr-token'], function (error) {
                if (error) console.error(error)
                else { console.log('success!'); }
            })
        } else if(res.status == 200 && res.data['login_status']==true) {
            window.location.replace("http://localhost:8000/whatsapp-dashboard");
        } else {
            console.log('No data');
        }
    }).catch(err => {
        console.log(err)
    });

}

setInterval(getQr, 5000);
