var ObjectId = require('mongoose').Schema.Types.ObjectId;
var requiredOption = require('../common').requireOption;
var moment = require('moment');
/* 
 * - Saves the task to the database
 */

module.exports = function (objectRepository) {
    var taskModel = requiredOption(objectRepository, 'taskModel');
    var stateModel = requiredOption(objectRepository, 'stateModel');
    
    return function (req, res, next) {
        var taskId = req.params.id;
        var task = res.tpl.task;
        if(typeof req.body.task_state !== 'undefined') { // Change state
            task._state = req.body.task_state;
            task.save((err, result)=>{
                if(err) {
                    console.log(err);
                }
                taskModel.populate(task,{
                    path: '_state',
                    populate: {path: 'next'}
                }, (err, task)=> {
                    if(err) {
                        console.log('Task population failed: '+err);
                    }
                    res.tpl.task = task;
                    return next();
                });
            });
        } else {
            var task = new taskModel({
                name: req.body.name,
                description: req.body.description,
                dueDate: moment(req.body.due),
                dependencies: req.body.dependencies
            });

            stateModel.findOne({name: 'Todo'}).exec((err, result) => {
                if(err) {
                    console.log('Default state not found. '+err);
                }
                task._state = result._id;
                task.save(function(err) {
                    if(err) {
                        console.log(err);
                    }
                    return next();
                });
            });
        }
    };
};