var request = require('request');
var __ = require('underscore');
var User = require('../models/user');
var Org = require('../models/org');

module.exports = {
  start: function(startIdx, endIdx) {
    var startIdx = startIdx || 0;
    var self = this;

    // var request = require('request');
    // var options = {
    //   url: 'https://api.github.com/users?since=' + startIdx + '&access_token='use your own'',
    //   headers: {
    //       'User-Agent': 'request'
    //   }
    // };

    // function callback(error, response, body) {
    //   console.log('sending request');
    //   if (!error && response.statusCode == 200) {
    //     var info = JSON.parse(body);
    //     var names = __.map(info, function(userLogin) {
    //       return { user: userLogin.login, id: parseInt(userLogin.id, 10) };
    //     });

    //     User.create(names, function(err, users) {
    //       console.log('saved', startIdx);
    //       self.start(startIdx + names.length);
    //     });
    //   }
    // }

    // request(options, callback);


    // User.find({}, function(err, users) {
    //   for (var i = 58400; i < 63400 - 1; i++) {
    //     console.log('i: ', i);
    //     var user = users[i];

    //     var options = {
    //       // url: 'https://api.github.com/users/' + user.user + '/orgs?access_token=' + 'i\'mlovingit',
    //       headers: {
    //           'User-Agent': 'request'
    //       }
    //     };

    //     function callback(error, response, body) {
    //       if (!error && response.statusCode == 200) {
    //         var info = JSON.parse(body);
    //         // console.log('info:', info);

    //         var urls = __.map(info, function(organization) {
    //           return { url: organization.login };
    //         });

    //         console.log('length: ', urls.length);
    //         Org.create(urls, function(err, url) {
    //           console.log('saved');
    //         });
    //       }
    //     }
    //     console.log('sending request');
    //     request(options, callback);
    //   }
    // });


    // Org.find({}).sort('_id').exec(function(err, orgs) {
    //   var j = 0;
    //   var start = 10000;
    //   orgs.slice(start).forEach(function(org, i) {
    //     var options = {
    //       url: 'https://api.github.com/orgs/' + org.url + '?access_token=chocolates',
    //       headers: {
    //           'User-Agent': 'request'
    //       }
    //     };

    //     function callback(error, response, body) {
    //       if (response.statusCode == 404) {
    //         console.log('removing');
    //         org.remove();
    //       }

    //       if (!error && response.statusCode == 200) {
    //         var info = JSON.parse(body);
    //           var urls = __.map(info, function(organization) {
    //             return { url: organization.login };
    //           });
    //           org.avatar_url = info.avatar_url;
    //           org.company = info.company;
    //           org.blog = info.blog;
    //           org.location = info.location;
    //           org.email = info.email;
    //           org.public_repos = info.public_repos;
    //           org.public_gists = info.public_gists;
    //           org.followers = info.followers;
    //           org.following = info.following;
    //           org.html_url = info.html_url;
    //           org.created_at = info.created_at;
    //           org = info;
    //            org.random = [Math.random(), Math.random()];
    //         org.save(function() {
    //           if (err) console.error('error saving');
    //           console.log('saved!', org.url, start + j++);
    //         });
    //       }
    //     }

    //     request(options, callback);
    //   });
    // });
  }
}
