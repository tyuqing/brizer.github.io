/**
 * Created by liufang on 2016/11/29.
 */
var UsersSchema =require('../../models/users/usersSchema');

var usersAPI = {};

usersAPI.getAllUsers = function(req,res,next){
    UsersSchema.find().
    exec('find',function(err,data){
        if(err){
            console.log('getAllUsers error '+ err);
            next(err);
        }else{
            res.json({
                result:1,
                data:data
            });
        }
    });


    //var a = new UsersSchema({'name':'lf','age':23});
    //a.save();

}

module.exports = usersAPI;
