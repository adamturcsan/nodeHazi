var dataSeed = require('./models/seed/bundle');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req,res,next){
    res.tpl = {};
    res.tpl.error = {};
    
    return next();
});

require('./routes/main')(app);
require('./routes/tasks')(app);
require('./routes/user')(app);
app.use('/static',express.static('static'));

var server = app.listen(3000, function () {
    dataSeed();
    console.log('Listening on port 3000');
});