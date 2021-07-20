// packages
const express = require('express');
const ejs = require('ejs');

// modules
// instantiates db and mongoose for the enire runtime
const mongoose = require(`${__dirname}/models/database.js`);

// app config
const app = express()
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

// routes
// default
app.get('/', (req, res) => {
    res.redirect('/login');
})
// un-authenticated
app.use('/', require(`${__dirname}/routes/default`))
// // authenticated
app.use('/user', require(`${__dirname}/routes/user`)) 

// port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Application listening to port ' + port))