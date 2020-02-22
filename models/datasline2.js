var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
    name:String,
    rate:String
})

var Datas2 = mongoose.model('datasLine2',dataSchema);
module.exports = Datas2;