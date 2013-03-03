
// Dependencies

require('coffee-script');

var express  = require('express'),
    path     = require('path');

require('express-namespace');

var app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);


// Configuration

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('GeYhuF9yitbo9vg9BFEd'));
    app.use(express.cookieSession());
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

// Environments

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.configure('test', function () {
    app.set('port', 3001);
});

app.configure('production', function () {

});

// Routes

require('./routes/index')(app);
require('./routes/api')(app);

// Execute

server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
