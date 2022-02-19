const express = require('express');
// new express Router
const router = express.Router();

// add a new rout to the express router
router.get('/', (req, res) => {
    res.render('landing/index')
});
router.get('/about-us', (req, res) => {
    res.render('landing/about-us')
});
router.get('/contact-us', (req, res) => {
    res.render('landing/contact-us')
});

module.exports = router;