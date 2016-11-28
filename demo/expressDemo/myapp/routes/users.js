var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/allUsers', function(req, res, next) {
    res.render('users/allUsers');
});

module.exports = router;
