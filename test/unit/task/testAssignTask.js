/* 
 * All rights reserved © 2017 Legow Hosting Kft.
 */
var expect = require('chai').expect;
var assignTaskMW = require('../../../middlewares/task/assignTask');

describe('assignTask middleware', function () {
    var req = {};
    var res = {
        tpl: {
            user: {
                id: {
                    userid: 1
                }
            },
            task: {
                _assignedTo: 0,
                save: function(cb) {
                    cb();
                }
            }
        }
    };
    it('should change _assignedTo to actual user id', function (done) {
        assignTaskMW({})(req, res, function(err){
            expect(err).to.eql(undefined);
            expect(res.tpl.task._assignedTo).to.eql(1);
            done();
        });
    });
    it('should log if save throws error', function(done){
        res.tpl.task.save = function(cb) {
            cb({type: 'Mock Error'});
        };
        var mockLogOutPut = null;
        defaultLog = console.log;
        console.log = function(output) {
            defaultLog.apply(console, arguments);
            mockLogOutPut += output;
        };
        assignTaskMW({})(req, res, function(err){
            expect(err).to.eql(undefined);
            expect(mockLogOutPut).to.not.eql(null);
            done();
        });
        console.log = defaultLog;
    });
});