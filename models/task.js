var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Task = db.model('Task',{
    name: String,
    description: String,
    _assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dueDate: Date,
    _state: {
        type: Schema.Types.ObjectId,
        ref: 'State'
    },
    dependencies: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

module.exports = Task;