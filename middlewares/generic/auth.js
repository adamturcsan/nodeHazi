/* 
 * - If user is logged in: next()
 * - Else redirect to login
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if(typeof req.session.userid === 'undefined') {
            return res.redirect('/login');
        }
        res.tpl.user = {
            id: req.session
        };
        return next();
    };
}