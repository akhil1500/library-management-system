const fs = require("fs");
const path = require("path");

// const publicKey = fs.readFileSync("public_key.pem", "utf-8");
// const privateKey = fs.readFileSync("private_key.pem", "utf-8");
const publicCert = fs.readFileSync(path.join(__dirname + "/jwt-key","public_key.pem"), "utf-8");
const privateCert = fs.readFileSync(path.join(__dirname + "/jwt-key","private_key.pem"), "utf-8");

module.exports = {
    publicCert,
    privateCert,
    JwtIssuer: "jwt-olms",
}