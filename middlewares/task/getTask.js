var requireOption = require('../common').requireOption;
/* 
 * - Gets the task of the given id
 */

module.exports = function (objectRepository) {
    var taskModel = requireOption(objectRepository, 'taskModel');
    
    return function (req, res, next) {
        taskModel.findOne({
            _id: req.params.id
        }, (err, result) => {
            if(err) {
                console.log('Task not found: '+req.params.id);
            }
            res.tpl.task = result;
            next();
        });
    };
};