/* 
 * - Renders the 'viewName' view
 */

module.exports = function (objectRepository, viewName) {
    return function (req, res, next) {
        res.render(viewName, res.tpl);
    };
};

