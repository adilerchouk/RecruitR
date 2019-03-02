const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Create express app
const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Parse application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./config/config.js');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to RecruitR application."});
});

// Define routes
require('./app/routes/positionRoutes.js')(app);
require('./app/routes/applicantRoutes.js')(app);

// Listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});