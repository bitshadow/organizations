var db       = require('../db');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  user: { type: String , unique: true },
  id: { type: Number, unique: true },
  lastId: { type: Number }
});

module.exports = db.model('User', userSchema);
