const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

//Allows for app instance to be passed to other modules
const app = module.exports = express();

// API file for interacting with MongoDB
const api = require('./server/routes/api');
var config = require('./config'); // get our config file
var User   = require('./model/accounts'); // get our mongoose model
var mongoose    = require('mongoose');
var morgan      = require('morgan');

//config
mongoose.connect(config.db.uri); // connect to database
app.set('superSecret', config.secret); // secret variable

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// use morgan to log requests to the console
app.use(morgan('dev'));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist/TokenPrototype/')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/TokenPrototype/index.html'));
});

//Set Port
const port = process.env.PORT || config.port;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

