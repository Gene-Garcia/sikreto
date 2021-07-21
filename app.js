require('dotenv').config();

// packages
const express = require('express');
const ejs = require('ejs');

// cookies-session packages
const passport = require('passport');
const session = require('express-session');

// app config
const app = express()
// cookies-session config
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// other app config
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(`${__dirname}/public`));

// modules
// instantiates db and mongoose for the enire runtime
const mongoose = require(`${__dirname}/models/database.js`);

// routes
// default
app.get('/', (req, res) => {
    res.redirect('/register');
})
// un-authenticated
app.use('/', require(`${__dirname}/routes/default`))
// // authenticated
app.use('/user', require(`${__dirname}/routes/user`))

// port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Application listening to port ' + port))