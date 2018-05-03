var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
        uuid : String,
        mapName : String,
        winLose : Boolean,
        heroes: [{type: String}]

});

module.exports = mongoose.model('Game', gameSchema);
