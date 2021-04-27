'use strict';

const jwt = require('jsonwebtoken');
require('dotenv').config();
console.log(`xdd ${process.env.JWTSECRET}`);

module.exports = (uid) =>{
    return new Promise((resolve, reject)=>{
        const payload = {
            uid
        };
        
        jwt.sign(payload, process.env.JWTSECRET, {
            expiresIn: '12h'
        }, (err, token)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(token);
        });
    });
}
