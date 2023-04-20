require('dotenv').config();


module.exports = {
    port: process.env.PORT,
    db:{
        host: process.env.DBHOST,
        name: process.env.DBNAME,
        user: process.env.DBUSER,
        pass: process.env.DBPASS
    },
    jwtsecret: process.env.TOKENSECRET
}