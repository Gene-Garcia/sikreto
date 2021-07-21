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

// export router for app.js
module.exports = router;