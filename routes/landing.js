const express = require('express');
// new express Router
const router = express.Router();

// add a new rout to the express router
router.get('/', (req, res) => {
    res.send('welcome')
})

module.exports = router;