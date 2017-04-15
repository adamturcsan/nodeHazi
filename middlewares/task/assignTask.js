var requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {
    var taskModel = requireOption(objectRepository, 'taskModel');

    return function (req, res, next) {
        var userid= res.tpl.user.id.userid;
        var task = res.tpl.task;
        
        task._assignedTo = userid;
        task.save((err) => {
            if(err) {
                console.log(err);
            }
            return next();
        })
    }
}


