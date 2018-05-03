var mongoose = require('mongoose');

var heroSchema = mongoose.Schema({
  name: String,
  type: String
});

module.exports = mongoose.model('Hero', heroSchema);
