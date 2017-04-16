var requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {
    var taskModel = requireOption(objectRepository, 'taskModel');
    
    return function(req, res, next) {
        var task = res.tpl.task;
        if(typeof task === 'undefined') {
            return next();
        }
        if(task.dependencies.length === 0) { // There are no dependencies
            return next();
        }
        taskModel.populate(task, {path: 'dependencies', select: 'name _state', populate: {path: '_state', select: 'name'}},(err, result) => {
            if(err) {
                console.log('Task population failed. '+err);
            }
            task = result;
            var missingDependency = false;
            task.dependencies.forEach((depTask) => {
                if(depTask._state.name !== 'Done') {
                    res.tpl.error.push('Dependent task ('+depTask.name+') is not done!');
                    missingDependency = true;
                }
            });
            res.tpl.missingDependency = missingDependency;
            return next();
        });
    };
};