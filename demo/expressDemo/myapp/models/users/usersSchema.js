/**
 * users model
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    name:String,
    age:Number
});

module.exports = mongoose.model('peoples', UsersSchema);

