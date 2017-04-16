var requiredOption = require('../common').requireOption;
var moment = require('moment');
/* 
 * - Checks if every task property is valid
 * - Not valid: err
 */

module.exports = function (objectRepository) {
    var stateModel = requiredOption(objectRepository, 'stateModel');
    var taskModel = requiredOption(objectRepository, 'taskModel');
    
    return function (req, res, next) {
        if(typeof req.body === 'undefined') {
            res.tpl.error.push('Data was not provided');
            if(typeof req.params.id !== 'undefined') {
                return res.redirect('/tasks/details/'+req.params.id);
            }
            return res.redirect('/tasks');
        }
        
        if(typeof req.params === 'undefined' || typeof req.params.id === 'undefined') {// Create new
            if(req.body.name === '' || req.body.description === '' || req.body.due === '') {
                res.tpl.error.push('Please fill all fields');
                return next();
            }
            var task = new taskModel({
                name: req.body.name,
                description: req.body.description,
                dueDate: moment(req.body.due),
                dependencies: req.body.dependencies
            });
            res.tpl.task = task;
            return next();
        } else if(typeof req.body.task_state !== 'undefined') { //Change state
            stateModel.findOne({_id: req.body.task_state}, function (err, result){
                if(err) {
                    res.tpl.error.push('Invalid state was provided');
                    return res.redirect('/tasks/details/'+req.params.id);
                }
                return next();
            });
        }
    };
};