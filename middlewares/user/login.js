var requireOption = require('../common').requireOption;
/* 
 * - gets the user data from database by email and pw
 */
module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {
        //not enough parameter
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
                (typeof req.body.password === 'undefined')) {
            return next();
        }

        //lets find the user
        userModel.findOne({
            emailAddress: req.body.email
        }, function (err, result) {
            if ((err) || (!result)) {
                res.tpl.error.push('Your email address is not registered!');
                return next();
            }

            //check password
            if (result.password !== req.body.password) {
                res.tpl.error.push('Wrong password!');
                return next();
            }

            //login is ok, save id to session
            req.session.userid = result._id;

            //redirect to / so the app can decide where to go next
            return res.redirect('/tasks');
        });
    };
};