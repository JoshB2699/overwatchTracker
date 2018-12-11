//Require all npm modules.
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');


//Initialize express app.
const app = express();

//Configure dotenv so we can securely store our mongo uri.
dotenv.config();
const dbURL = process.env.MONGO_URI;

//Require our config file.
const config = require('./config/config.js');

//Connect to mongo database.
mongoose.connect(dbURL, { useNewUrlParser: true });

//Set the view engine to use ejs.
app.set('view engine', 'ejs');
//Set up the views directory.
app.set('views', path.join(__dirname, 'views'));
//Set up public directory.
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));
//Configure body parser.
app.use(bodyParser.urlencoded({ extended: true }));


//Require our routes file.
require('./config/routes.js')(app, mongoose, uuid);

//Listen on the defined port and send a message to the console.
app.listen(config.port);
console.log("Website running on port " + config.port);
