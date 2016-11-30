/**
 * Created by liufang on 2016/11/29.
 */
var UsersSchema =require('../../models/users/usersSchema');

var usersAPI = {};

usersAPI.getAllUsers = function(req,res,next){
    UsersSchema.
        find().
        sort({'age': -1}).
        exec('find',function (err,data){
            if(err){
                console.log('getAllUsers error '+err);
                next(err);
            }else{
                res.json({
                    result: 1,
                    data: data
                });
            }
        });


    //var a = new UsersSchema({'name':'lf','age':23});
    //a.save();

};

usersAPI.getOneUser = function(req,res,next){
    var name = req.query.name;
    UsersSchema.findOne({'name':name},function(err,data){
        if(err){
            console.log('getOneUser error '+err);
            next(err);
        }else{
            res.json({
                result: 1,
                data: data
            });
        }
    })
};

usersAPI.sendUserInfo = function(req,res,next){
    var model = req.body;
    UsersSchema.update({name:model.name},model,{upsert:true},function(err,data){
       if(err){
           console.log('save user error,'+err);
           res.json({
               result:0
           });
       } else {
           console.log('save user success,name='+model.name);
           res.json({
               result:1
           });
       }
    });
};

usersAPI.removeUser = function(req,res,next){
    var model = req.body;
    var name = model.name;
    UsersSchema.remove({'name':name},function(err,data){
        if(err){
            console.log('removeUser error,'+err);
            res.json({
                result:0
            });
        }else{
            console.log('removeUser success');
            res.json({
                result:1
            });
        }
    })
};

module.exports = usersAPI;
