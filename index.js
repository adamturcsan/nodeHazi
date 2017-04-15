var dataSeed = require('./models/seed/bundle');
var express = require('express');
var session = require('express-session');
var app = express();

var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(session({
    secret: 't4skMg6',
    cookie: {
        maxAge: 1000*3600*24
    },
    resave: true,
    saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req,res,next){
    res.tpl = {};
    res.tpl.error = [];
    
    return next();
});

require('./routes/main')(app);
require('./routes/tasks')(app);
require('./routes/user')(app);
app.use('/static',express.static('static'));

/**
 * Standard error handler
 */
app.use(function (err, req, res, next) {
    console.log('Error');
  res.status(500).send('Houston, we have a problem!');

  //Flush out the stack to the console
  console.error(err);
});

var server = app.listen(3000, function () {
    dataSeed();
    console.log('Listening on port 3000');
});