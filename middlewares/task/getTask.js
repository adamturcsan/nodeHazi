/* 
 * - Gets the task of the given id
 */

module.exports = function (objectRepository) {
    return function (req, res, next) {
        var tasks = objectRepository.tasks;
        var task = null;
        for(key in tasks) {
            if(tasks[key].id == req.params.id) {
                task = tasks[key];
            }
        }
        res.tpl.task = task;
        return next();
    };
};