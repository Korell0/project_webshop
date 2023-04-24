const express = require('express');
const Router = express.Router();
const multer = require('multer')({
        storage:require('multer').diskStorage({
             destination:"./uploads",
            filename:(req,file,cb)=>{
                let filename=file.originalname.split('.')[0]+Date.now()+path.extname(file.originalname)
                cb(null,filename)
            }
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) cb(null, true);
            else cb({
                'message': 'File is not accepted!',
                'name': 'FileAccept Error',
                'code': 'FILE_NOT_ACCEPTED'
            }, false);
        },
        limits:{
                fileSize: 5242880
            }
        });
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