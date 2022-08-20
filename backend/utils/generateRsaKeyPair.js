const crypto = require("crypto");
const fs = require("fs");

const generateRsaKeyPair = (pathToPrivateKey, pathToPublicKey) => {
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: "pkcs1", // "Public Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
    privateKeyEncoding: {
      type: "pkcs1", // "Public Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
  });

  fs.writeFileSync(pathToPublicKey, keyPair.publicKey);
  fs.writeFileSync(pathToPrivateKey, keyPair.privateKey);
};

module.exports = generateRsaKeyPair;
