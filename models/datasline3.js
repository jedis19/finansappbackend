var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
    name:String,
    rate:String
})

var Datas3 = mongoose.model('datasLine3',dataSchema);
module.exports = Datas3;