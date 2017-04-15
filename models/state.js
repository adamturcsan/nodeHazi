var Schema = require('mongoose').Schema;
var db = require('../config/db');

var State = db.model('State',{
    name: String,
    next: [{
            type: Schema.Types.ObjectId,
            ref: 'State'
    }]
});

module.exports = State;