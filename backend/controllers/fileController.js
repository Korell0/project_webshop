const express = require('express');
const Router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: './uploads/' });
const config = require('../modules/config');
const mysql = require('mysql');
var connection = mysql.createConnection(config);


Router.post('/item', (req, res)=>{
    let image = req.file;
    upload.single('image')(req,res,(err)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(image);
    });
})

module.exports = Router;