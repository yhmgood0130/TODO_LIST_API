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
      res.body[0].type.should.equal('cleaning');
      res.body[0].should.have.property('schedule');
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
      res.body.type.should.equal('work');
      res.body.should.have.property('schedule');
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
        type: "Family",
        schedule: "11/24/2017T07:00:00.000Z"
      })
      .end(function(err, res) {
        let day = '2017-11-24T07:00:00.000Z'

        res.should.have.status(200);
        res.should.be.json; // jshint ignore:line
        res.body.should.be.a('object');
        res.body.should.have.property('task');
        res.body.task.should.equal('Make an appointment for cats');
        res.body.should.have.property('type');
        res.body.type.should.equal('Family');
        res.body.should.have.property('schedule');
        res.body.schedule.should.equal(day);
        done();
      });
    });
  });

  describe('PUT /todolist/:id', function() {
    it('should update a show', function(done) {
      chai.request(server)
      .put('/todolist/1')
      .send({
        task: "Pick up a friend at DIA",
        type: "",
        schedule: "11/11/2017T11:00:00.000Z"
      })
      .end(function(err, res) {
        let day = '2017-11-11T11:00:00.000Z'

        res.should.have.status(200);
        res.should.be.json; // jshint ignore:line
        res.body.should.be.a('object');
        res.body.should.have.property('task');
        res.body.task.should.equal('Pick up a friend at DIA');
        res.body.should.have.property('type');
        res.body.type.should.equal('');
        res.body.should.have.property('schedule');
        res.body.schedule.should.equal(day);
        done();
      });
    });
    it('should NOT update a show if the id field is part of the request', function(done) {
      chai.request(server)
      .put('/todolist/1')
      .send({
        id: 20,
        task: "Pick up a friend at DIA",
        type: "",
        schedule: "11/11/2017T11:00:00.000Z"
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

  describe('DELETE /api/v1/shows/:id', function() {
    it('should delete a show', function(done) {
      chai.request(server)
      .delete('/api/v1/shows/1')
      .end(function(error, response) {
        response.should.have.status(200);
        response.should.be.json; // jshint ignore:line
        response.body.should.be.a('object');
        response.body.should.have.property('name');
        response.body.name.should.equal('Suits');
        response.body.should.have.property('channel');
        response.body.channel.should.equal('USA Network');
        response.body.should.have.property('genre');
        response.body.genre.should.equal('Drama');
        response.body.should.have.property('rating');
        response.body.rating.should.equal(3);
        response.body.should.have.property('explicit');
        response.body.explicit.should.equal(false);
        chai.request(server)
        .get('/api/v1/shows')
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json; // jshint ignore:line
          res.body.should.be.a('array');
          res.body.length.should.equal(3);
          res.body[0].should.have.property('name');
          res.body[0].name.should.equal('Game of Thrones');
          res.body[0].should.have.property('channel');
          res.body[0].channel.should.equal('HBO');
          res.body[0].should.have.property('genre');
          res.body[0].genre.should.equal('Fantasy');
          res.body[0].should.have.property('rating');
          res.body[0].rating.should.equal(5);
          res.body[0].should.have.property('explicit');
          res.body[0].explicit.should.equal(true);
          done();
        });
      });
    });
  });

  it('should list ALL todolist on /todolist GET');
  it('should list a SINGLE todolist on /todolist/<id> GET');
  it('should add a SINGLE todolist on /todolist POST');
  it('should update a SINGLE todolist on /todolist/<id> PUT');
  it('should delete a SINGLE todolist on /todolist/<id> DELETE');
});
