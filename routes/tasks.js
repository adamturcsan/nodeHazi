module.exports = function (app) {
    var objectRepository = {
        tasks: [
            {
                id: 1,
                name: 'Task1',
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                assignee: 'TA',
                dueDate: '2017-04-15',
                state: 'In progress'
            },
            {
                id: 2,
                name: 'Task2',
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                assignee: 'TA',
                dueDate: '2017-05-01',
                state: 'Assigned'
            }
        ]
    };

    var authMW = require('../middlewares/generic/auth');
    var renderMW = require('../middlewares/generic/render');

    var getTaskMW = require('../middlewares/task/getTask');
    var getTaskListMW = require('../middlewares/task/getTaskList');
    var checkTaskDataMW = require('../middlewares/task/checkTaskData');
    var saveTaskMW = require('../middlewares/task/saveTask');
    var deleteTaskMW = require('../middlewares/task/deleteTask');

    app.post('/tasks/assign/:id',
        authMW(objectRepository),
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
        saveTaskMW(objectRepository),
        renderMW(objectRepository, 'tasks/show')
    );

    app.get('/tasks/add',
        authMW(objectRepository),
        renderMW(objectRepository, 'tasks/add')
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
        getTaskListMW(objectRepository),
        renderMW(objectRepository, 'tasks/list')
    );

};