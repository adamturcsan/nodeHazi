var userModel = require('../models/user');

module.exports = function (app) {
    var objectRepository = {
        userModel: userModel
    };

    var renderMW = require('../middlewares/generic/render');

    var checkUserDataMW = require('../middlewares/user/checkUserData');
    var saveUserMW = require('../middlewares/user/saveUser');
    var logoutMW = require('../middlewares/user/logout');
    var inverseAuthMW = require('../middlewares/user/inverseAuth');
    var loginMW = require('../middlewares/user/login');

    app.get('/user/registration',
        renderMW(objectRepository, 'registration')
    );

    app.post('/user/registration',
        checkUserDataMW(objectRepository),
        saveUserMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/login');
        }
    );

    app.get('/logout',
        logoutMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/login');
        }
    );

    app.get('/login',
        inverseAuthMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

    app.post('/login',
        inverseAuthMW(objectRepository),
        loginMW(objectRepository),
        checkUserDataMW(objectRepository),
        renderMW(objectRepository, 'login')
    );
};