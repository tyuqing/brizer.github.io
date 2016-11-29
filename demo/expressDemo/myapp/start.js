/**
 * Created by liufang on 2016/11/29.
 */
var debug = require('debug')('myapp');
var mongoose = require('mongoose');

var app = require('./app');
var config = require('./config/config');

app.set('config',config);

//启动mongo
mongoose.connect(app.get('config').dbUrl);
mongoose.connection.on('connected',function(){
    console.log('connect to the mongodb success');
});
mongoose.connection.on('error',function(err){
    console.log('connect to the mongodb error:'+err);
    process.exit(1);
});
mongoose.connection.on('disconnected',function(){
    console.log('disconnect mongodb');
    process.exit(1);
});

app.listen(app.get('config').port || 3000,function(){
    console.log('Express server start success');
    debug('Express server listening on port '+ app.get('config').port || 3000);
});