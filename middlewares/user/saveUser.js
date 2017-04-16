/* 
 * - save the user data to database
 */

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof res.tpl.user === 'undefined') {
            return next();
        }
        var user = res.tpl.user;

        user.save((err) => {
            if (err) {
                console.log(err);
            }
            return res.redirect('/login');
        });
    };
};