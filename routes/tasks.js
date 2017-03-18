module.exports = function (app) {
    var objectRepository = {};

    var authMW = require('../middlewares/generic/auth');
    var renderMW = require('../middlewares/generic/render');

    var getTaskMW = require('../middlewares/task/getTask');
    var checkTaskDataMW = require('../middlewares/task/checkTaskData');
    var saveTaskMW = require('../middlewares/task/saveTask');
    var deleteTaskMW = require('../middlewares/task/deleteTask');

    app.post('/tasks/assign/:id',
        authMW(objectRepository)
    );

    app.get('/tasks/details/:id',
        authMW(objectRepository),
        getTaskMW(objectRepository),
        renderMW(objectRepository, 'show')
    );

    app.post('/tasks/details/:id',
        authMW(objectRepository),
        getTaskMW(objectRepository),
        checkTaskDataMW(objectRepository),
        saveTaskMW(objectRepository),
        renderMW(objectRepository, 'show')
    );

    app.get('/tasks/add',
        authMW(objectRepository),
        renderMW(objectRepository, 'add')
    );

    app.post('/tasks/add',
        authMW(objectRepository),
        checkTaskDataMW(objectRepository),
        saveTaskMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/tasks');
        }
    );

    app.get('/tasks/del/:id',
        authMW(objectRepository),
        getTaskMW(objectRepository),
        deleteTaskMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/tasks');
        }
    );

    app.get('/tasks',
        authMW(objectRepository),
        renderMW(objectRepository, 'list')
    );

};