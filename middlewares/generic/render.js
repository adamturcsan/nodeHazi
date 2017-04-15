/* 
 * - Renders the 'viewName' view
 */

module.exports = function (objectRepository, viewName) {
    return function (req, res, next) {
        console.log('template variables', res.tpl);
        res.render(viewName, res.tpl);
    };
};

