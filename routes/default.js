// package
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// cookies-session package
const passport = require('passport');

// db models
const Account = mongoose.model('Account');

// embed authentication strategy to model, and serialization
passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// routes
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    // research for the best to handle validation modularly
    // check for null values

    // password validation

    // database validation

    // check if email and username exists

    Account.register({
        email: req.body.email,
        username: req.body.username
    }, req.body.password, (err, account) => {
        if (err) {
            res.redirect('/register');
        } else {
            console.log(`${account.username} register success`);
            res.redirect('/login');
        }
    })

});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {

    passport.authenticate('local', function (err, user, info) {
        // console.log(JSON.stringify(info)); // {"name":"IncorrectUsernameError","message":"Password or username is incorrect"}, or undefined if success

        if (err) {
            console.log(`1 ${err}`);
            return next(err);
        } else if (!user) { // false if no user is found
            return res.redirect('/login');
        } else {
            req.logIn(user, function (err) { // account contains 
                if (err) {
                    console.log(`3 ${err}`);
                    return next(err);
                } else {
                    return res.redirect('/account/sikreto');
                }
            });
        }

    })(req, res, next);

});

// export router for app.js
module.exports = router;