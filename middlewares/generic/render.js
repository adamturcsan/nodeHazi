/* 
 * - Renders the 'viewName' view
 */

module.exports = function (objectRepository, viewName) {
    return function (req, res, next) {
        res.end('Template: ' + viewName);
    }
};

