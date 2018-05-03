var mongoose = require('mongoose');

var mapSchema = mongoose.Schema({
        name  : String,
        mapType : String
});

module.exports = mongoose.model('Map', mapSchema);
