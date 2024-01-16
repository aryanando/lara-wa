console.log("its works!!!");

import QRCode from 'qrcode'
import axios from 'axios';
window.axios = axios;
window.QRCode = QRCode;

var canvas = document.getElementById('qr');


function getQr() {
    window.axios.get('http://localhost:3000/').then(res => {
        if (res.status == 200) {
            console.log(res.data);
            window.QRCode.toCanvas(canvas, res.data['qr-token'], function (error) {
                if (error) console.error(error)
                else { console.log('success!'); }
            })
        } else {
            console.log('No data');
        }
    }).catch(err => {
        console.log(err)
    });

}

setInterval(getQr, 5000);
