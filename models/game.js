var mongoose = require('mongoose');

//Make a database schema for a game record.
var gameSchema = mongoose.Schema({
        uuid : String,
        mapName : String,
        winLose : Boolean,
        heroes: [{type: String}]

});

module.exports = mongoose.model('Game', gameSchema);
