var Schema = require('mongoose').Schema;
var db = require('../config/db');

var User = db.model('User',{
    name: String,
    emailAddress: String,
    password: String
});

module.exports = User;