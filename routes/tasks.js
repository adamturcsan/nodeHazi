var taskModel = require('../models/task');
var stateModel = require('../models/state');

module.exports = function (app) {
    var objectRepository = {
        taskModel: taskModel,
        stateModel: stateModel
    };

    var authMW = require('../middlewares/generic/auth');
    var renderMW = require('../middlewares/generic/render');

    var getTaskMW = require('../middlewares/task/getTask');
    var getTaskListMW = require('../middlewares/task/getTaskList');
    var checkTaskDataMW = require('../middlewares/task/checkTaskData');
    var checkTaskDependenciesMW = require('../middlewares/task/checkTaskDependencies');
    var saveTaskMW = require('../middlewares/task/saveTask');
    var deleteTaskMW = require('../middlewares/task/deleteTask');
    var assignTaskMW = require('../middlewares/task/assignTask');
    
    app.post('/tasks/assign/:id',
        authMW(objectRepository),
        getTaskMW(objectRepository),
        assignTaskMW(objectRepository),
        function (req,res,next) {
            return res.redirect('/tasks/details/'+req.params.id);
        }
    );

    app.get('/tasks/details/:id',
        authMW(objectRepository),
        getTaskMW(objectRepository),
        renderMW(objectRepository, 'tasks/show')
    );

    app.post('/tasks/details/:id',
        authMW(objectRepository),
        getTaskMW(objectRepository),
        checkTaskDataMW(objectRepository),
        checkTaskDependenciesMW(objectRepository),
        saveTaskMW(objectRepository),
        renderMW(objectRepository, 'tasks/show')
    );

    app.get('/tasks/add',
        authMW(objectRepository),
        getTaskListMW(objectRepository),
        renderMW(objectRepository, 'tasks/add')
    );

    app.post('/tasks/add',
        authMW(objectRepository),
        checkTaskDataMW(objectRepository),
        saveTaskMW(objectRepository),
        getTaskListMW(objectRepository),
        renderMW(objectRepository, 'tasks/add')
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
        getTaskListMW(objectRepository),
        renderMW(objectRepository, 'tasks/list')
    );

};