/* 
 * - remove the user data from session
 */

module.exports = function(objectRepository) {
    return function (req, res, next) {
        return next();
    };
};