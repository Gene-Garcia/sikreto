require('dotenv').config();

// creating a secure connection
const fs = require('fs');
const https = require('https');
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

// packages
const express = require('express');
const ejs = require('ejs');

// cookies-session-authentication packages
const passport = require('passport');
const session = require('express-session');

// oauth packages and strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

// app configs
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
// call the models
const Account = require('mongoose').model('Account');

// embed local authentication strategy to model, local means manual registration
passport.use(Account.createStrategy());

// passport cookie write and read
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    Account.findById(id, function (err, user) { // update the model name
        done(err, user);
    });
});

// Embedding Google OAuth 2.0 to Passport
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://localhost:3000/auth/google/sikreto" // create anothe file for auth
  },
  function(accessToken, refreshToken, profile, cb) {
    // findOrCreate is not a mongoose method
    // we need installed another package
    Account.findOrCreate({ 
        google_id: profile.id,
        email: profile.emails[0].value,
        username: profile.name.givenName.toLocaleLowerCase() + profile.name.familyName.toLocaleLowerCase()
    }, (err, user) => {
      return cb(err, user); // it think this called by the serialize or deserialize
    });
  }
));

// Embedding Facebbok OAuth to Passport
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://localhost:3000/auth/fb/sikreto",
    profileFields: ['id', 'displayName', 'name', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    Account.findOrCreate({ 
        facebook_id: profile.id,
        email: profile.emails[0].value,
        username: profile.name.givenName.toLocaleLowerCase() + profile.name.familyName.toLocaleLowerCase()
    }, (err, user) => {
      return cb(err, user); // it think this called by the serialize or deserialize
    });
  }
));

// routes
// default
app.get('/', (req, res) => {
    res.redirect('/signup');
})
// un-authenticated
app.use('/', require(`${__dirname}/routes/default`))
// authentications
app.use('/auth', require(`${__dirname}/routes/authentication`))
// authenticated
app.use('/user', require(`${__dirname}/routes/user`))

// Listener and HTTPS server creation
const port = process.env.PORT || 3000;
const server = https.createServer({key: key, cert: cert }, app);
server.listen(port, () => { console.log('Application listening to port ' + port + '. https://localhost:3000/') });
