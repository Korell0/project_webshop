const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: './uploads/' });
const config = require('../modules/config');
const mysql = require('mysql');
var connection = mysql.createConnection(config);

const app = express();

app.post('/item', (req, res)=>{
    let image = req.file;
    upload.single('image');
})

module.exports = Router;