var requireOption = require('../common').requireOption;

module.exports = function (objectRepository) {
    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {
        if ((typeof req.body === 'undefined') ||
                (req.body.name === '') ||
                (req.body.email === '') ||
                (req.body.password === '') ||
                (req.body.confirmPassword === '')) {
            res.tpl.error.push('Please fill all fields!');
            return next();
        }

        userModel.findOne({emailAddress: req.body.email}).exec((err, result) => {
            console.log(err, result);
            if (result) {
                res.tpl.error.push('Email address is already in use');
                console.log('call next');
                return next();
            }
            if (req.body.password !== req.body.confirmPassword) {
                res.tpl.error.push('Passwords don\'t match');
                console.log(req.body.password, req.body.confirmPassword);
                return next();
            }

            var user = new userModel({
                name: req.body.name,
                emailAddress: req.body.email,
                password: req.body.password
            });
            res.tpl.user = user;
            return next();
        });
    };
};