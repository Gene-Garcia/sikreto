// package
const express = require('express');
const router = express.Router();

// db models
const Account = require('mongoose').model('Account');

// router
// landing page of the user
// allowed to post their secrets
router.get('/sikreto', (req, res) => {
    if (!req.isAuthenticated()) res.redirect('/');
        
    res.render('sikreto', {sikretos: req.user.sikretos});
});

router.post('/sikreto', (req, res) => {
    if (!req.isAuthenticated()) res.redirect('/');

    const sikreto = {
        value: req.body.text,
        date: new Date(Date.now()).toDateString()
    }

    req.user.sikretos.push(sikreto)
    Account.updateOne({_id: req.user._id}, req.user, (err, result) => {
        if (err) console.log(err);
        res.redirect('/user/sikreto')
    })

    // do we still need to re-login?

});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/signin');
});

// export router for app.js
module.exports = router;