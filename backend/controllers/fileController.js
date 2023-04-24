const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: './uploads/' });
const config = require('../modules/config');
const mysql = require('mysql');
var connection = mysql.createConnection(config);

const app = express();

app.post('/item', upload.single('image'), (req, res)=>{
    let image = req.file;
    let text = req.body; 
    connection.query(`INSERT INTO \`**dbname**\` (\`**fields**\`) VALUES (\`**values**\`)`, (err, result)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    })
})

module.exports = Router;