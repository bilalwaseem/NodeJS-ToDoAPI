const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var msg = "The quick brown fox jumps over the lazy dog";

var hash = SHA256(msg).toString();

console.log("Msg:", msg);
console.log("Hash", hash);

var data = {
  id: 10
};

var token = jwt.sign(data, 'secretSalt');
console.log('Token: ', token);

var decoded = jwt.verify(token + '1', 'secretSalt');
console.log('Decoded: ', decoded);
