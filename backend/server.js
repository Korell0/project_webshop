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

app.use('/api', dbController);
app.use('/files', fileController);
app.use('/mail', mailController);
app.use('/users', userController);

app.use('/media', express.static(path.join(__dirname, './uploads')));


app.listen(config.port, log('SERVER', `http://localhost:${config.port} started`) );