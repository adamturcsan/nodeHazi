/* 
 * All rights reserved © 2017 Legow Hosting Kft.
 */
var expect = require('chai').expect;
var checkTaskDataMW = require('../../../middlewares/task/checkTaskData');

describe('checkTaskData middleware', function () {
    
    describe('body is undefined', function (){
        var fakeStateModel = {};
        var fakeTaskModel = {};
        
        it('should call redirect', function(done) {
            var testNext = function(err){
                expect(res.tpl.error.length).to.be.above(0);
                expect(res.redirectCalled).to.be.true;
                expect(res.redirectRoute).to.be.eql('/tasks');
                done();
            };
            var req = {};
            var res = {
                redirectCalled: false,
                redirectRoute: null,
                redirect: function(route) {
                    this.redirectCalled = true;
                    this.redirectRoute = route;
                    return testNext();
                },
                tpl: {
                    error: []
                }
            };
            checkTaskDataMW({
                stateModel: fakeStateModel,
                taskModel: fakeTaskModel
            })(req, res, {});
        });

        it('should call redirect with task id if exists', function(done){
            var req = {
                params: {
                    id: 1
                }
            };
            var res = {
                redirectCalled: true,
                redirectRoute: null,
                redirect: function(route) {
                    this.redirectRoute = true;
                    this.redirectRoute = route;
                    return testNext();
                },
                tpl: {
                    error: []
                }
            };
            var testNext = function(err) {
                expect(res.tpl.error.length).to.be.above(0);
                expect(res.redirectCalled).to.be.true;
                expect(res.redirectRoute).to.be.eql('/tasks/details/1');
                done();
            };
            checkTaskDataMW({
                stateModel: fakeStateModel,
                taskModel: fakeTaskModel
            })(req, res, {});
        });
    });
    
    describe('has body so it\'s a POST', function(){
        
        describe('and params or params.id is undefined so it\'s new', function(){
            var fakeTaskModel = function(options) {
                return options;
            };
            var fakeStateModel = {};
            var res = {
                tpl: {
                    error: []
                }
            };
            var req = {};
            describe('name, description or due date missing', function() {
                req.body = {
                    name: '',
                    description: '',
                    due: ''
                };
                it('should set errors for all', function(done){
                    checkTaskDataMW({
                        stateModel: fakeStateModel,
                        taskModel: fakeTaskModel
                    })(req, res, function(err){
                        expect(err).to.eql(undefined);
                        expect(res.tpl.error.length).to.be.above(0);
                        expect(res.tpl.error[0]).to.contain('fill');
                        done();
                    });
                });
                res.tpl.error = [];
                req.body.name = 'Test';
                it('should set errors for description and due', function(done){
                    checkTaskDataMW({
                        stateModel: fakeStateModel,
                        taskModel: fakeTaskModel
                    })(req, res, function(err){
                        expect(err).to.eql(undefined);
                        expect(res.tpl.error.length).to.be.above(0);
                        expect(res.tpl.error[0]).to.contain('fill');
                        done();
                    });
                });
                res.tpl.error = [];
                req.body.description = '';
                req.body.due = 'Test';
                it('should set errors for name and description', function(done){
                    checkTaskDataMW({
                        stateModel: fakeStateModel,
                        taskModel: fakeTaskModel
                    })(req, res, function(err){
                        expect(err).to.eql(undefined);
                        expect(res.tpl.error.length).to.be.above(0);
                        expect(res.tpl.error[0]).to.contain('fill');
                        done();
                    });
                });
                res.tpl.error = [];
                req.body.name = '';
                req.body.description = 'Test';
                it('should set errors for name and due', function(done){
                    checkTaskDataMW({
                        stateModel: fakeStateModel,
                        taskModel: fakeTaskModel
                    })(req, res, function(err){
                        expect(err).to.eql(undefined);
                        expect(res.tpl.error.length).to.be.above(0);
                        expect(res.tpl.error[0]).to.contain('fill');
                        done();
                    });
                });
            });
            
            describe('every data is present, create new', function(){
                it('should create new task and put it in res.tpl', function(done){
                    var moment = require('moment');
                    var req = {};
                    req.body = {
                        description: 'Mock Description',
                        name: 'Mock name',
                        due: '2017-05-12 15:00:00',
                        dependencies: undefined
                    };
                    var res = {
                        tpl: {
                            error: []
                        }
                    };
                    checkTaskDataMW({
                        stateModel: fakeStateModel,
                        taskModel: fakeTaskModel
                    })(req, res, function(err){
                        var expectedTask = req.body;
                        expectedTask.dueDate = moment(expectedTask.due);
                        delete(expectedTask.due);
                        expect(err).to.eql(undefined);
                        expect(res.tpl.task).to.eql(new fakeTaskModel(expectedTask));
                        done();
                    });
                });
            });
        });
        
        describe('and params id is present so it\'s an update.', function(){
            var fakeStateModel = {
                findOne: function(query, cb){
                    var error = null;
                    if(query._id == 'invalid') {
                        error = 'Can\'t find it';
                        return cb(error, null);
                    }
                    var result = {
                        id: query._id
                    };
                    return cb(error, result);
                }
            };
            var fakeTaskModel = {};
            it('should return error if invalid state id was provided', function(done){
                var req = {
                    params: {
                        id: 1
                    },
                    body: {
                        task_state: 'invalid'
                    }
                };
                var testNext = function(err) {
                    expect(res.tpl.error.length).to.be.above(0);
                    expect(res.redirectCalled).to.be.true;
                    expect(res.redirectRoute).to.be.eql('/tasks/details/1');
                    done();
                };
                var res = {
                    tpl: {
                        error: []
                    },
                    redirectCalled: true,
                    redirectRoute: null,
                    redirect: function(route) {
                        this.redirectRoute = true;
                        this.redirectRoute = route;
                        return testNext();
                    }
                };
                checkTaskDataMW({
                    stateModel: fakeStateModel,
                    taskModel: fakeTaskModel
                })(req, res, testNext);
            });
            
            it('should return without error if every data is ok', function(done){
                var req = {
                    params: {
                        id: 1
                    },
                    body: {
                        task_state: 1
                    }
                };
                var res = {};
                checkTaskDataMW({
                    taskModel: fakeTaskModel,
                    stateModel: fakeStateModel
                })(req, res, function(err){
                    expect(err).to.eql(undefined);
                    done();
                });
            });
        });
        describe('and params id is present but body is not processed', function(){
            
            it('should redirect to tasks', function(done){
                var req = {
                    params: {
                        id: 1
                    },
                    body: {
                        notValid: true
                    }
                };
                var res = {
                    redirectCalled: true,
                    redirectRoute: null,
                    redirect: function(route) {
                        this.redirectRoute = true;
                        this.redirectRoute = route;
                        return testNext();
                    }
                };
                var testNext = function(err) {
                    expect(err).to.eql(undefined);
                    expect(res.redirectCalled).to.be.true;
                    expect(res.redirectRoute).to.be.eql('/tasks');
                    done();
                };
                checkTaskDataMW({
                    taskModel: {},
                    stateModel: {}
                })(req, res, testNext);
            });
        });
    });
});