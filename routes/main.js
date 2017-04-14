/* 
 * All rights reserved © 2017 Legow Hosting Kft.
 */
module.exports = function(app) {
    app.get('/',function(req,res,next){
        res.redirect('login');
    });
};

