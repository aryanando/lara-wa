console.log("its works!!!");

import QRCode from 'qrcode'
var canvas = document.getElementById('qr')
window.QRCode = QRCode

window.QRCode.toCanvas(canvas, 'as', function (error) {
  if (error) console.error(error)
  else {console.log('success!');}
})
