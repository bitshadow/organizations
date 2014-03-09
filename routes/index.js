
var async        = require('async');
var Org          = require('../models/org');
var request      = require('request');
var url          = require('url');
var LIMIT        = 30;

function parseUrlQuery(url) {
  var parsedJSON = {};
  if (!url) { return parsedJSON };

  url.split('&').forEach(function(param) {
    var paramArray = param.split('=');
    paramArray[1] && (parsedJSON[paramArray[0]] = paramArray[1]);
  });

  return parsedJSON;
}

module.exports = {
  index: function(req, res, next){

    async.parallel({
      orgs: function(cb){
        Org.find({}).sort({ public_repos: -1 }).limit(LIMIT).lean().exec(cb)
      }
    }, function(err, result) {
      if (err) return next(err);
      res.render('index', result);
    });
  },

  orgs: function(req, res, next) {
    var msg = req.body;
    var regex = new RegExp(msg.terms, 'i');

    async.parallel({
      orgs: function(cb) {
        if (msg.terms != '') {
          Org.find({ url: regex }).lean().exec(cb)
        } else {
          Org.find({}).sort({ public_repos: -1 }).lean().exec(cb)
        }
      }
    }, function(err, result) {
      if (err) return next(err);

      if (msg.page) {
        var page = parseInt(msg.page);
        var data = result.orgs.slice((page * LIMIT), (page+1) * LIMIT);
        res.send(200, data);
      }
    });
  },

  random: function(req, res, next) {
    async.parallel({
      orgs: function(cb) {
        Org.find().where('random').near([Math.random(), Math.random()]).limit(LIMIT).exec(cb);
      }
    }, function(err, result) {
      if (err) return next(err);
      res.render('random', result);
    });
  },

  callback: function(req, res, next) {
    var session_code = req.query.code;

    request.post(
      'https://github.com/login/oauth/access_token',
      { form: {
          client_id: 'xyz',
          client_secret: 'xyz',
          code: session_code,
          accept: 'json'
        }
      },

      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var access_token = parseUrlQuery(body)['access_token'];
          console.log('access_token:', access_token);
        }
      }
    );
  }
};