// package
const express = require('express');
const router = express.Router();
const _ = require('lodash');

// cookies-session package
const passport = require('passport');

// db models
const Account = require('mongoose').model('Account');
const Contact = require('mongoose').model('Contact');

// data
const faqs = require('../data/faqs');
const policies = require('../data/privacy-policy');
const tAndCs = require('../data/terms-and-conditions');

// routes
router.get('/signup', (req, res) => {
    res.render('default/signup');
});

router.post('/signup', (req, res) => {
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
            res.redirect('/signup');
        } else {
            console.log(`${account.username} signup success`);
            res.redirect('/signin');
        }
    })

});

router.get('/signin', (req, res) => {
    res.render('default/signin');
});

router.post('/signin', (req, res, next) => {

    passport.authenticate('local', function (err, user, info) {
        // console.log(JSON.stringify(info)); // {"name":"IncorrectUsernameError","message":"Password or username is incorrect"}, or undefined if success

        if (err) {
            console.log(`1 ${err}`);
            return next(err);
        } else if (!user) { // false if no user is found
            return res.redirect('/signin');
        } else {
            req.logIn(user, function (err) { // account contains 
                if (err) {
                    console.log(`3 ${err}`);
                    return next(err);
                } else {
                    return res.redirect('/user/sikreto');
                }
            });
        }

    })(req, res, next);

});

router.get('/sikretos', (req, res) => {

    let rawSikretos = []

    Account.find({}, '-_id sikretos', (err, docs) => {

        docs.forEach(doc => {
            rawSikretos.push(doc.sikretos);
        });

        const sikretos = _.flattenDeep(rawSikretos)

        // check if the request is authenticated
        // or if a user is logged in
        if (req.isAuthenticated()) {
            res.render('default/sikretos', {
                sikretos: sikretos,
                username: req.user.username
            });
        } else {
            res.render('default/sikretos', {
                sikretos: sikretos
            });
        }

    });
});

router.get('/terms-and-conditions', (req, res) => {
    res.render('default/terms-and-conditions', {
        data: tAndCs.tAndCs
    })
});

router.get('/privacy-policy', (req, res) => {
    res.render('default/privacy-policy', {
        data: policies.policies
    })
});

router.get('/faqs', (req, res) => {
    res.render('default/faqs', {
        data: faqs.faqs
    })
});

router.get('/contact', (req, res) => {
    res.render('default/contact')
})

router.post('/contact', (req, res) => {

    // add validation and empty fields checker

    const contact = new Contact({
        category: req.body.category,
        subject: req.body.subject,
        message: req.body.message
    })
    contact.save((err) => {
        if (err) {
            console.log(err);
            res.render('default/contact')
        } else {
            console.log('new contact/feedback created');
            res.redirect('/sikretos')
        }
    })

})

// export router for app.js
module.exports = router;