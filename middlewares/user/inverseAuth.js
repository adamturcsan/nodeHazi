/* 
 * - If user is not logged in: next()
 * - Else redirect to tasks
 */

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof req.session.userid !== 'undefined') {
            return res.redirect('/tasks');
        }
        return next();
    };
};