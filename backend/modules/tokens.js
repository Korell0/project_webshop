let jwtsecret = require('./config').jwtsecret;
let jose = require('jose');



function ProtectedRoute(table){
    //These are the whitelisted tables.
    let whitelist = [
        "",
    ];
    return whitelist.filter(e=>e==table).length <= 0;
}





module.exports = {
    Check:()=>(req, res, next)=>{
        if (req.headers.authorization){
            if (req.headers.authorization.split(' ')[0]==="JWT"){
                //if the bearer is JWT, then try to decode the token
                jose.jwtVerify(req.headers.authorization.split(' ')[1], new TextEncoder().encode(jwtsecret) ).then(()=>{
                    //on success, go on with the request.
                    next();
                }).catch((error)=>{
                    //on fail send the reason of denial.
                    res.status(401).send(error);
                })
            }
            else{
                //if the bearer isn't JWT, then send the error tot the client to change it to JWT
                res.status(400).json({
                    message: "Your authorization is not JWT, please set it to JWT. (example: JWT your_token_here)",
                    code: "ERR_NOT_JWT"
                });
            }
        }
        //if the client doesn't have a token in the authorization field,
        //then if the table he requests is protected (aka. not in the whitelist), send an error to them,
        //otherwise the request goes on.
        else {
            if (ProtectedRoute(req.params.table)){
                res.status(401).json({
                    message: "You don't have access to this!",
                    code: "ERR_FORBIDDEN",
                });
            }
            else next();
        }
    }
}