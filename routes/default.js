// package
const express = require('express');
const router = express.Router();

// router.get(...)
router.get('/login', (req, res) => {
    res.render('test');
});

// export router for app.js
module.exports = router;