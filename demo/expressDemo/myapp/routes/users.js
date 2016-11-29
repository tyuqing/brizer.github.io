var express = require('express');
var usersAPI = require('../lib/api/usersAPI');
var router = express.Router();

/* GET users listing. */

router.get('/allUsers', function(req, res, next) {
    res.render('users/allUsers');
});

//api
router.get('/getAllUsers',usersAPI.getAllUsers);

module.exports = router;
