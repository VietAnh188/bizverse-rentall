const NodeRSA = require('node-rsa');

const generateSignature = (messages, privateKeyInString) => {
    const key = new NodeRSA();
    key.importKey(new Buffer.from(privateKeyInString, 'base64'), 'pkcs8-private-der');
    const privateKey = key.exportKey();
    const signature = new NodeRSA(privateKey, { signingScheme: 'sha1' }).sign(messages).toString('hex');
    return signature;
}

const verifySignature = (message, signatureString, publicKeyInString) => {
    const key = new NodeRSA();
    key.importKey(new Buffer.from(publicKeyInString, 'base64'), 'pkcs8-public-der');
    const publicKey = key.exportKey('public');
    const checkSignature = new NodeRSA(publicKey, { signingScheme: 'sha1' }).verify(message, signatureString, 'utf8', 'hex');
    return checkSignature;
}

module.exports = {
    generateSignature,
    verifySignature
}