var taskModel = require('../task');
var dataCount = require('./generic').count;
var hasData = require('./generic').moreThanZero;

var seed = function() {
    var insertData = function() {
        var dueDate = new Date();
        dueDate.setTime(Date.now()+1000*3600*24*7);
        return taskModel.collection.insert({
            name: 'Test Task',
            description: 'First task for testing purposes',
            dueDate: dueDate,
            next: []
        });
    };
    
    return dataCount(taskModel)
            .then(hasData)
            .then(insertData)
            .then(() => {console.log('Task seed finsihed')})
            .catch(function(err){
                console.log('Task seed failed: '+err);
            });
};

module.exports = seed;