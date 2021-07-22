// package
const express = require('express');
const router = express.Router();

// router
// landing page of the user
// allowed to post their secrets
router.get('/sikreto', (req, res) => {
    if (req.isAuthenticated()){
    res.render('sikreto');
    } else {
        res.redirect('/');
    }
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

// export router for app.js
module.exports = router;