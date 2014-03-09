var db       = require('../db');
var mongoose = require('mongoose');

var defaultStringOptions = { type: String, trim: true };
var defaultNumberOptions = { type: Number, default: 0 };
var randomNumberOptions = { type: [Number], default: function(){ return [Math.random(), Math.random()]}, index: '2d' };

var orgSchema = new mongoose.Schema({
  url: { type: String , trim: true, unique: true },
  avatar_url: defaultStringOptions,
  name: defaultStringOptions,
  company: defaultStringOptions,
  blog: defaultStringOptions,
  location: defaultStringOptions,
  email: defaultStringOptions,
  public_repos: defaultNumberOptions,
  public_gists: defaultNumberOptions,
  followers: defaultNumberOptions,
  following: defaultNumberOptions,
  html_url: defaultStringOptions,
  created_at: defaultStringOptions,
  random: randomNumberOptions
});

module.exports = db.model('Org', orgSchema);
