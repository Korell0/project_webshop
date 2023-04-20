require('dotenv').config();
let sql = require('mysql2');

module.exports = {
    port: process.env.PORT,
    dbconnection : sql.createPool({
        database:process.env.DBNAME,
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        connectionLimit: process.env.DBLIMIT
    }) ,
    jwtsecret: process.env.TOKENSECRET
}