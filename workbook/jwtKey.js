const crypto = require('crypto');
const fs = require('fs');

// Function to generate RSA key pair
const generateRsaKeys = () => {
  // Generate a new RSA key pair with a 2048-bit modulus
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'pkcs1', // or 'spki' for PEM or 'pkcs8' for DER
      format: 'pem' // 'pem' or 'der'
    },
    privateKeyEncoding: {
      type: 'pkcs1', // or 'spki' for PEM or 'pkcs8' for DER
      format: 'pem', // 'pem' or 'der'
      cipher: 'aes-256-cbc', // encrypt the private key
      passphrase: 'top secret' // passphrase to encrypt the private key
    }
  });

  return { privateKey, publicKey };
};

// Generate RSA key pair
// const { privateKey, publicKey } = generateRsaKeys();

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });

// Write keys to files (optional)
fs.writeFile('private_key.pem', privateKey, (err) => {
  if (err) throw err;
  console.log('Private Key has been saved to private_key.pem');
});

fs.writeFile('public_key.pem', publicKey, (err) => {
  if (err) throw err;
  console.log('Public Key has been saved to public_key.pem');
});

// Usage example
console.log('Private Key:', privateKey);
console.log('Public Key:', publicKey);
