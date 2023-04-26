let jose = require('jose');
let sha256 = require('crypto-js/sha256');
let db = require('../modules/config').dbconnection;
let jwtsecret = new TextEncoder().encode(require('../modules/config').jwtsecret);
let Router = require('express').Router();
let token = require('../modules/tokens').Check;

Router.post('/tokencheck', token() ,(req,res)=>{
    res.status(200).send({message: 'success'});
})

Router.post('/login', async (req, res)=>{
    db.query('select * from users where email=? and password=?', [req.body.email, req.body.password], async (err, data)=>{
        if (err) res.status(500).send(err);
        else{
            if (data.length>0){
                res.status(200).send({
                    message: 'Successful login!',
                    token: await issueToken(data[0].username, data[0].permission, data[0].ID)
                })
            }
            else {
                res.status(401).send({
                    message: 'Bad credentials!',
                })
            }
        }
    })
})

Router.post('/register', (req, res)=>{
    db.query('select ID from users where email=?', [req.body.email], (err,data)=>{
        if (err) res.status(500).send(err);
        else {
            if (data.length>0){
                res.status(400).send({
                    message:"E-mail address must be unique!"
                });
            }
            else{
                db.query('insert into users (username, password, email, name, permission) values (?, ?, ?, ?, 1)', [req.body.username, req.body.password, req.body.email, req.body.name], (err, data)=>{
                    if (err) res.status(500).send(err);
                    else res.status(200).send(data);
                })
            }
        }
    })
})

Router.get('/testToken', async (req,res)=>{
    res.status(200).send(
        await new jose.SignJWT({
            admin:true,
            id:1,
        })
          .setProtectedHeader({alg: 'HS256'})
          .setIssuedAt()
          .setIssuer('Webshop')
          .setAudience('Webshop:User')
          .setExpirationTime('1d')
          .sign(jwtsecret)
    );
})


async function issueToken(user, permission, userid){
    return await new jose.SignJWT({
        permission: permission,
        id: userid,
    })
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setIssuer('Webshop')
        .setAudience('Webshop:'+user)
        .sign(jwtsecret);
}
module.exports = Router;