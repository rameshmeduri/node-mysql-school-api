var chai = require('chai');
var expect = chai.expect;
const app = require('./index.js');

chai.use(require('chai-http'));

describe('User endpoints', function () {
  this.timeout(5000);
  it('Success: validated all paramaters email', function (done) {
    var pass = {
      url: '/api/test',
      json: {
        teacher: 't1@teacher.com',
        notification: 'Hello students! @s5@student.com @s1@student.com'
      }
    };
    chai
      .request(app)
      .post(pass.url)
      .send(pass.json)
      .end(function (err, res) {
        expect(res.status).to.not.equal(206);
        done();
      });
  });
  it('Failed: validated all paramaters email', function (done) {
    var pass = {
      url: '/api/register ',
      json: {
        teacher: 'teacher1@teacher.com',
        students: ['s2@student.com', 's3@student.com']
      }
    };
    chai
      .request(app)
      .post(pass.url)
      .send(pass.json)
      .end(function (err, res) {
        expect(res.status).to.equal(206);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('As a teacher, I want to register one or more students to a specified teacher.', function (done) {
    var pass = {
      url: '/api/register',
      json: {
        teacher: 't1@teacher.com',
        students: ['s2@student.com', 's3@student.com']
      }
    };
    chai
      .request(app)
      .post(pass.url)
      .send(pass.json)
      .end(function (err, res) {
        expect(res.status).to.equal(204);
        expect(res.body).to.deep.equal({});
        done();
      });
  });
  it('Single Teacher: As a teacher, I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers).', function (done) {
    var pass = {
      url: '/api/commonstudents?teacher=t1@teacher.com'
    };
    chai
      .request(app)
      .get(pass.url)
      .end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('students');
        expect(res.body['students']).to.have.lengthOf.at.least(1);
        done();
      });
  });
  it('Multiple Teacher:  As a teacher, I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers).', function (done) {
    var pass = {
      url: '/api/commonstudents?teacher=t1@teacher.com&teacher=t2@teacher.com'
    };
    chai
      .request(app)
      .get(pass.url)
      .end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('students');
        expect(res.body['students']).to.have.lengthOf.at.least(1);
        done();
      });
  });
  it('No common: As a teacher, I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers).', function (done) {
    var pass = {
      url:
        '/api/commonstudents?teacher=t1@teacher.com&teacher=t2@teacher.com&teacher=t6@teacher.com'
    };
    chai
      .request(app)
      .get(pass.url)
      .end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('students');
        expect(res.body['students']).to.have.lengthOf(0);
        done();
      });
  });
  it('As a teacher, I want to suspend a specified student.', function (done) {
    var pass = {
      url: '/api/suspend',
      json: {
        student: 's1@student.com'
      }
    };
    chai
      .request(app)
      .post(pass.url)
      .send(pass.json)
      .end(function (err, res) {
        expect(res.status).to.equal(204);
        expect(res.body).to.deep.equal({});
        done();
      });
  });
  it('As a teacher, I want to retrieve a list of students who can receive a given notification.', function (done) {
    var pass = {
      url: '/api/retrievefornotifications',
      json: {
        teacher: 't1@teacher.com',
        notification: 'Hello students! @s5@student.com @s1@student.com'
      }
    };
    chai
      .request(app)
      .post(pass.url)
      .send(pass.json)
      .end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('recipients');
        expect(res.body['recipients']).to.have.lengthOf.at.least(1);
        done();
      });
  });
  it('Has suspended student: As a teacher, I want to retrieve a list of students who can receive a given notification.', function (done) {
    var pass = {
      url: '/api/retrievefornotifications',
      json: {
        teacher: 't1@teacher.com',
        notification: 'Hello students!'
      }
    };
    chai
      .request(app)
      .post(pass.url)
      .send(pass.json)
      .end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('recipients');
        done();
      });
  });
});
