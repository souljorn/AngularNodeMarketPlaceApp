const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');



//config
const config = require('./config'); // get our config file
mongoose.connect(config.db.uri); // connect to database
//Export express app for other files to use
const app = module.exports = express();
app.set('superSecret', config.secret); // secret variable
app.set('URI', config.db.uri); // URI variable

//import routes
const accountRoute = require('./routes/accounts');
const itemsRoute = require('./routes/items');
const authRoute = require('./routes/auth');
const imageRoute = require('./routes/images');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// use morgan to log requests to the console
app.use(morgan('dev'));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist/TokenPrototype/')));

// API routes
app.use('/api', accountRoute);
app.use('/api', itemsRoute);
app.use('/api', authRoute);
app.use('/api', imageRoute);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/TokenPrototype/index.html'));
});

//Set Port
const port = process.env.PORT || config.port;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

