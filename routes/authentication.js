// package
const express = require('express');
const router = express.Router();
const passport = require('passport')

// this redirects to google login
router.get('/google', 
    passport.authenticate('google', { scope: ['profile', 'email']} ));

// callback from google
router.get('/google/sikreto', 
    passport.authenticate('google', { failureRedirect: "/login" }), 
    (req, res) => {
        res.redirect('/account/sikreto');
    });

// this redirects to fb login
router.get('/fb', 
    passport.authenticate('facebook', { scope: ['public_profile', 'email']} ));

// callback from fb
router.get('/fb/sikreto', 
    passport.authenticate('facebook', { failureRedirect: "/login" }), 
    (req, res) => {
        res.redirect('/account/sikreto');
    }); 

// export router for app.js
module.exports = router;