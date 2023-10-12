const secp = require('ethereum-cryptography/secp256k1');
const { toHex } = require('ethereum-cryptography/utils');

const genWallet = () => {
    const privateKey = secp.utils.randomPrivateKey();
    console.log("Private Key:", toHex(privateKey).toString());

    const publicKey = secp.getPublicKey(privateKey);
    console.log("Public Key:", toHex(publicKey).toString());

    return {
        privateKey: toHex(privateKey),
        publicKey: toHex(publicKey)
    }
}

module.exports = { genWallet };

