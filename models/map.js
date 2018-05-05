var mongoose = require('mongoose');

//Make a database schema for a map record.
var mapSchema = mongoose.Schema({
        name  : String,
        mapType : String
});

module.exports = mongoose.model('Map', mapSchema);
