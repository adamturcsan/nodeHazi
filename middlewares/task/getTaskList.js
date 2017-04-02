/* 
 * All rights reserved © 2017 Legow Hosting Kft.
 */

module.exports = function (objectRepository) {
    return function (req,res,next) {
        res.tpl.tasks = objectRepository.tasks;
        return next();
    }
}