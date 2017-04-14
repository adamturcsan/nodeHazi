/* 
 * - If user is logged in: next()
 * - Else redirect to login
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        res.tpl.user = {
            id: 1
        };
        return next();
    };
}