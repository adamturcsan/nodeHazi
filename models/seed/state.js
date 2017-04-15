var mongoose = require('mongoose');
var stateModel = require('../state');
var dataCount = require('./generic').count;
var hasData = require('./generic').moreThanZero;

var seed = function() {
    
    var insertData = function() {
        var todoId =  mongoose.Types.ObjectId(),
        assignedId = mongoose.Types.ObjectId(),
        inProgressId =  mongoose.Types.ObjectId(),
        doneId = mongoose.Types.ObjectId();
        
        return stateModel.collection.insert([{
            _id: todoId,
            name: 'Todo',
            next: [assignedId]
        },{
            _id: assignedId,
            name: 'Assigned',
            next: [todoId,inProgressId]
        },{
            _id: inProgressId,
            name: 'In progress',
            next: [todoId,assignedId,doneId]
        },{
            _id: doneId,
            name: 'Done',
            next: []
        }]);
    };
    
    return dataCount(stateModel)
            .then(hasData)
            .then(insertData)
            .then(() => {console.log('State seed finsihed')})
            .catch(function(err){
                console.log('State seed failed: '+err);
            });
};

module.exports = seed;