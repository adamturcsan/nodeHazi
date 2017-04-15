var userModel = require('../user');
var dataCount = require('./generic').count;
var hasData = require('./generic').moreThanZero;

var seed = function() {
    var insertData = function() {
        return userModel.collection.insert({
            name: 'Test User',
            emailAddress: 'test@valid-host.com',
            password: 'awfullyNotHashedPassword'
        });
    };
    
    return dataCount(userModel)
            .then(hasData)
            .then(insertData)
            .then(() => {console.log('User seed finsihed')})
            .catch(function(err){
                console.log('User seed failed: '+err);
            });
};

module.exports = seed;