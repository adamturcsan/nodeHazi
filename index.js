/* 
 * All rights reserved © 2017 Legow Hosting Kft.
 */

var express = require('express');
var app = express();

app.use(express.static('static'));
var server = app.listen(3000, function () {
    console.log('Listening on port 3000');
});