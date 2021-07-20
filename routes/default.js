// package
const express = require('express');
const router = express.Router();

// routes
router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register',(req, res) => {
    console.log(req.body);

    res.end();
})


// export router for app.js
module.exports = router;