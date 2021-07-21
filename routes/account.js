// package
const express = require('express');
const router = express.Router();

// router.get(...)
router.get('/sikreto', (req, res) => {
    if (req.isAuthenticated()){
    res.render('sikreto');
    } else {
        res.send('Not Authenticated!');
    }
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

// export router for app.js
module.exports = router;