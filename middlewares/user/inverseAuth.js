/* 
 * - If user is not logged in: next()
 * - Else redirect to /
 */

module.exports = function(objectRepository) {
    return function (req, res, next) {
        return next();
    };
};