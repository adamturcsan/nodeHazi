var Schema = require('mongoose').Schema;
var db = require('../config/db');

var User = db.model('State',{
    name: String,
    next: [{
            type: Schema.Types.ObjectId,
            ref: 'State'
    }]
});

module.exports = User;