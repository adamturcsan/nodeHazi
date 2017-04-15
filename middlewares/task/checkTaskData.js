var requiredOption = require('../common').requireOption;
/* 
 * - Checks if every task property is valid
 * - Not valid: err
 */

module.exports = function (objectRepository) {
    var stateModel = requiredOption(objectRepository, 'stateModel');
    
    return function (req, res, next) {
        if(typeof req.body === 'undefined') {
            res.tpl.error.push('Data was not provided');
            if(typeof req.params.id !== 'undefined') {
                return res.redirect('/tasks/details/'+req.params.id);
            }
            return res.redirect('/tasks');
        }
        
        if(typeof req.params === 'undefined' || typeof req.params.id === 'undefined') {// Create new
            return next();
        } else if(typeof req.body.task_state !== 'undefined') { //Change state
            console.log('Change task state');
            stateModel.findOne({_id: req.body.task_state}, function (err, result){
                if(err) {
                    res.tpl.error.push('Invalid state was provided');
                    return res.redirect('/tasks/details/'+req.params.id);
                }
                console.log(result);
                return next();
            });
        }
    };
};