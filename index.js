var express = require('express');
var app = express();

app.use('/static',express.static('static'));

require('./routes/tasks')(app);
require('./routes/user')(app);

var server = app.listen(3000, function () {
    console.log('Listening on port 3000');
});