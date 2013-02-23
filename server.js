
// Dependencies

require('coffeescript');

var express = require('express'),
    routes  = require('./routes'),
    user    = require('./routes/user'),
    http    = require('http'),
    path    = require('path');

require('express-namespace');

var app = express();

// Configuration

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

// Environments

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.configure('test', function () {

});

app.configure('production', function () {

});

// Routes

app.get('/', routes.index);

// Execute

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
