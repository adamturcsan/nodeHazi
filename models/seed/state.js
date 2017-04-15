var mongoose = require('mongoose');
var stateModel = require('../state');
var dataCount = require('./generic').count;
var hasData = require('./generic').moreThanZero;

var seed = function() {
    
    var insertData = function() {
        var todoRef = {
            $ref: 'State',
            $id: mongoose.Types.ObjectId()
        }, assignedRef = {
            $ref: 'State',
            $id: mongoose.Types.ObjectId()
        }, inProgressRef = {
            $ref: 'State',
            $id: mongoose.Types.ObjectId()
        }, doneRef = {
            $ref: 'State',
            $id: mongoose.Types.ObjectId()
        };
        
        return stateModel.collection.insert([{
            _id: todoRef.$id,
            name: 'Todo',
            next: [assignedRef]
        },{
            _id: assignedRef.$id,
            name: 'Assigned',
            next: [todoRef,inProgressRef]
        },{
            _id: inProgressRef.$id,
            name: 'In progress',
            next: [todoRef,assignedRef,doneRef]
        },{
            _id: doneRef.$id,
            name: 'Done'
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