var mongoose = require('mongoose');

//Make a databse schema for hero data.
var heroSchema = mongoose.Schema({
  name: String,
  type: String
});

module.exports = mongoose.model('Hero', heroSchema);
