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
            console.log('here')
            res.json(err);
        } else {
            Account.authenticate()(req.body.email, req.body.password, (err, result) => {
                if (err) {
                    console.log('here2')
                    res.json(err);
                } else {
                    res.json(result);
                }
            })
        }
    })

});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {

    console.log(`next: ${next}`);

    passport.authenticate('local', function (err, account, found) {

        if (err) {
            console.log(`1 ${err}`);
            return next(err);
        } else if (!found) { // boolean, I think false if no user is found
            console.log(`2 ${found}`);
            return res.redirect('/login');
        } else {
            req.logIn(account, function (err) { // account contains 
                if (err) {
                    console.log(`3 ${err}`);
                    return next(err);
                } else {
                    return res.render('sikreto');
                }
            });
        }
        
    })(req, res, next);

});

// export router for app.js
module.exports = router;