var userSeed = require('./user');
var taskSeed = require('./task');
var stateSeed = require('./state');

var bundleSeed = function () {
    stateSeed();
    userSeed();
//    taskSeed();
};

module.exports = bundleSeed;