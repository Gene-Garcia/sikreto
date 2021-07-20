// package
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// db models
const Account = mongoose.model('Account');

// routes
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register',(req, res) => {
    // research for the best to handle validation modularly
    // check for null values

    // password validation

    // database validation

    // check if email and username exists

    const newAccount = Account({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    newAccount.save((err) => {
        if (err){
            console.log(err);
            res.redirect('/register');
        } else {
            res.render('sikreto');
        }
    })
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    
    // check for null values

    Account.findOne({
        email: req.body.email
    }, (err, doc) => {
        if (err) {
            console.log(err);
            res.redirect('/login');
        } else {

            if (doc === null) res.redirect('/login')
            else {
                // check password
                if (doc.password == req.body.password) res.render('sikreto');
                else res.redirect('/login')
            }

        }
    });
});

// export router for app.js
module.exports = router;