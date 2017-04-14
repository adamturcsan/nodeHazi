var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/taskMgr');

module.exports = mongoose;