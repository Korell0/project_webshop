let express = require('express');
let cors = require('cors');

let config = require('./modules/config');
let log = require('./modules/logging');

let dbController = require('./controllers/dbController');
let fileController = require('./controllers/fileController');
let mailController = require('./controllers/mailController');
let userController = require('./controllers/userController');
const path = require('path');

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//localhost:8888/api/:table/:field/:value
app.use('/api', dbController);

//localhost:8888/files/upload
app.use('/files', fileController);

//localhost:8888/mail/to/:id
app.use('/mail', mailController);

//localhost:8888/users/login
//localhost:8888/users/register
//localhost:8888/users/token-decode
app.use('/users', userController);

//localhost:8888/media/:imagename.ext
app.use('/media', express.static(path.join(__dirname, './uploads')));


app.listen(config.port, log('SERVER', `http://localhost:${config.port} started`) );