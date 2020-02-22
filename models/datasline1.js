var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
    name:String,
    rate:String
})

var Datas = mongoose.model('datasLine1',dataSchema);
module.exports = Datas;