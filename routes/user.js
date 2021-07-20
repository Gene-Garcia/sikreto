// package
const express = require('express');
const router = express.Router();

// router.get(...)
router.get('/me', (req, res) => {
    res.render('test-auth');
});

// export router for app.js
module.exports = router;