var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var knex = require('../db/knex');
var should = chai.should();

chai.use(chaiHttp);


describe('TODO_LIST', function() {

  beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return knex.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      done();
    });
  });

  describe('GET /todolist/lists', function() {
    it('should return all lists', function(done) {
      chai.request(server)
      .get('/todolist/lists')
      .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json; // jshint ignore:line
      res.body.should.be.a('array');
      res.body.length.should.equal(6);
      res.body[0].should.have.property('task');
      res.body[0].task.should.equal('Clean the room');
      res.body[0].should.have.property('type');
      done();
      });
    });
  });

  describe('GET /todolist/list?id="number"', function() {
    it('should return all lists', function(done) {
      chai.request(server)
      .get('/todolist/list?id=4')
      .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json; // jshint ignore:line
      res.body.should.be.a('object');
      res.body.should.have.property('task');
      res.body.task.should.equal('Group Meeting');
      res.body.should.have.property('type');
      done();
      });
    });
  });

  describe('POST /todolist', function() {
    it('should add a list', function(done) {
      chai.request(server)
      .post('/todolist')
      .send({
        task: "Make an appointment for cats",
        type: "Family"
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json; // jshint ignore:line
        res.body.should.be.a('object');
        res.body.should.have.property('task');
        res.body.task.should.equal('Make an appointment for cats');
        res.body.should.have.property('type');
        res.body.type.should.equal('Family');
        done();
      });
    });
  });

  describe('PUT /todolist/:id', function() {
    it('should update a list', function(done) {
      chai.request(server)
      .put('/todolist/1')
      .send({
        task: "Pick up a friend at DIA",
        type: ""
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json; // jshint ignore:line
        res.body.should.be.a('object');
        res.body.should.have.property('task');
        res.body.task.should.equal('Pick up a friend at DIA');
        res.body.should.have.property('type');
        res.body.type.should.equal('');
        done();
      });
    });
    it('should NOT update a list if the id field is part of the request', function(done) {
      chai.request(server)
      .put('/todolist/1')
      .send({
        id: 20,
        task: "Pick up a friend at DIA",
        type: ""
      })
      .end(function(err, res) {
        res.should.have.status(422);
        res.should.be.json; // jshint ignore:line
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal('You cannot update the id field');
        done();
      });
    });
  });

  describe('DELETE /todolist/:id', function() {
    it('should delete a list', function(done) {
      chai.request(server)
      .delete('/todolist/1')
      .end(function(error, response) {
        response.should.have.status(200);
        response.should.be.json; // jshint ignore:line
        response.body.should.be.a('object');
        response.body.should.have.property('task');
        response.body.task.should.equal('Clean the room');
        response.body.should.have.property('type');
        response.body.type.should.equal('cleaning');
        chai.request(server)
        .get('/todolist/lists')
        .end(function(err, res) {

          res.should.have.status(200);
          res.should.be.json; // jshint ignore:line
          res.body.should.be.a('array');
          res.body.length.should.equal(5);
          res.body[0].should.have.property('task');
          res.body[0].task.should.equal('Learn about ASP.NET');
          res.body[0].should.have.property('type');
          res.body[0].type.should.equal('work');
          done();
        });
      });
    });
  });
});
