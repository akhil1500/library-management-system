const jwt = require('jsonwebtoken');

const {privateKey} = require("../config/index");

const payload = {
    name: "Akhil",
    age: "28"
};
const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

console.log(token);