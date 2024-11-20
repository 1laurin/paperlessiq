const crypto = require('crypto');

const generateSecret = () => {
    return crypto.randomBytes(64).toString('hex'); // Generates a 64-byte random secret in hex format
};

console.log(generateSecret());
