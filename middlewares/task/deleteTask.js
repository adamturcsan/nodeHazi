/* 
 * - Deletes the task of the given id
 */

module.exports = function (objectRepository) {
    return function (req, res, next) {
        var task = res.tpl.task;
        task.remove((err) => {
            if(err) {
                console.log(err);
            }
            return next();
        });
    };
};