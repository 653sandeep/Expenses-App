var express = require('express'), 
    http = require('http'),
    path = require('path'),
    Cash = require('./app/models/Cash');
var bodyParser = require('body-parser');
var app = express();
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var configDB = require('./config/database.js');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

mongoose.connect(configDB.url); 
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'sessionsecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


require('./app/routes.js')(app, passport); 
require('./config/passport')(passport);

var server = app.listen(5000, function() {
    console.log('Listening on port %d', server.address().port);
  });