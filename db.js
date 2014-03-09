var mongoose = require('mongoose'),
    config = require('config');

var uri = generateUri(config.db);
var db = mongoose.createConnection(uri);

db.on('error', console.error.bind(console, 'MongoDB Connection Error: '));

if (config.mongoose.debug) {
  mongoose.set('debug', true);
}

module.exports = db;

// MongoDB URI mongodb://<user>:<pass>@host/database
function generateUri(dbConfig){
  var uri = 'mongodb://';
  if (dbConfig.username) {
    uri += dbConfig.username;
    if (dbConfig.password) uri += ':' + dbConfig.password;
    uri += '@';
  }

  uri += dbConfig.hostname + ':' + dbConfig.port + '/' + dbConfig.database;
  return uri;
}