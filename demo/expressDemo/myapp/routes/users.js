var express = require('express');
var usersAPI = require('../lib/api/usersAPI');
var router = express.Router();

/* GET users listing. */

router.get('/allUsers', function(req, res, next) {
    res.render('users/allUsers');
});
router.get('/addEditUser',function(req,res,next){
    res.render('users/addEditUser');
});

//api
router.get('/getAllUsers',usersAPI.getAllUsers);
router.get('/getOneUser',usersAPI.getOneUser);
router.post('/sendUserInfo',usersAPI.sendUserInfo);
router.post('/removeUser',usersAPI.removeUser);

module.exports = router;
