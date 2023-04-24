let jose = require('jose');
let sha256 = require('crypto-js/sha256');
let db = require('../modules/config').dbconnection;
let jwtsecret = new TextEncoder().encode(require('../modules/config').jwtsecret);
let Router = require('express').Router();
let token = require('../modules/tokens').Check;
Router.post('/login', (req,res)=>{
    
})


Router.post('/tokencheck', token() ,(req,res)=>{
    res.status(200).send({message: 'success'});
})
Router.get('/testToken', async (req,res)=>{
    res.status(200).send(
        await new jose.SignJWT({
            admin:true,
            id:1,
        })
          .setProtectedHeader({alg: 'HS256'})
          .setIssuedAt()
          .setIssuer('Czechum')
          .setAudience('Czechum:User')
          .setExpirationTime('1d')
          .sign(jwtsecret)
    );
})
module.exports = Router;