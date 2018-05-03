var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
        uuid : Number,
        mapType : String
});

module.exports = mongoose.model('Game', gameSchema);
