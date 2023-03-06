const QRCode = require('qrcode');

export async function getQRCode(input) {
  return await QRCode.toDataURL(JSON.stringify(input))
    .then(async (url) => {
      return url.toString().replace("data:image/png;base64,", "");
    })
    .catch((err) => {
      console.error(err);
    });
}
