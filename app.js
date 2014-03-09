
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var isProduction = ('production' == process.env.NODE_ENV);
var isStaging = ('staging' == process.env.NODE_ENV);
var isDevelopment = ('development' == process.env.NODE_ENV);
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var github = require('./modules/github');
var pkgjson  = require('./package.json');

var app = express();

var isProduction = ('production' == app.get('env'));
var isStaging = ('staging' == app.get('env'));
var isDevelopment = ('development' == app.get('env'));

app.locals.isProduction         = isProduction;
app.locals.isStaging            = isStaging;
app.locals.isDevelopment        = isDevelopment;
app.locals.version              = pkgjson.version;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/orgs', routes.orgs);
app.get('/random', routes.random);
app.get('/callback', routes.callback);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

github.start();
