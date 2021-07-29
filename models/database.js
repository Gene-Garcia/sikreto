// database odm package
const mongoose = require('mongoose');

// modules
const config = require(`../config/db_config.js`);

// connect 
mongoose.connect(config.dbURI(), {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

// schema and models
require('./account');
require('./contact');