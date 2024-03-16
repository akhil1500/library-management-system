const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const {privateCert, publicCert, JwtIssuer} = require("../config/index");

const getJwtToken = payload => 
    new Promise((resolve, reject)=>{
        jwt.sign(
            {...payload},
            privateCert,
            {
                algorithm: "RS256",
                expiresIn: "7d",
                issuer: JwtIssuer
            },
            (err, token)=>{
                if(err) return reject(new Error("Error while generating Jwt Token."));
                resolve(token);
            }
        )
    });

const verifyJwtToken = token => 
    new Promise((resolve, reject)=>{
        jwt.verify(
            token,
            publicCert,
            {
                algorithms: "RS256",
                issuer: JwtIssuer
            },
            (err, decoded)=>{
                if(err) return reject(err);
                resolve(decoded);
            }
        )
    })

module.exports = {
    getJwtToken,
    verifyJwtToken
}