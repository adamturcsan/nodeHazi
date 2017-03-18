/* 
 * - If user is logged in: next()
 * - Else redirect to login
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        return next();
    };
}