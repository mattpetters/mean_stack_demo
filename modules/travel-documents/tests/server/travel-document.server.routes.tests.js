'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  TravelDocument = mongoose.model('TravelDocument'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  travelDocument;

/**
 * Travel document routes tests
 */
describe('Travel document CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Travel document
    user.save(function () {
      travelDocument = {
        name: 'Travel document name'
      };

      done();
    });
  });

  it('should be able to save a Travel document if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Travel document
        agent.post('/api/travelDocuments')
          .send(travelDocument)
          .expect(200)
          .end(function (travelDocumentSaveErr, travelDocumentSaveRes) {
            // Handle Travel document save error
            if (travelDocumentSaveErr) {
              return done(travelDocumentSaveErr);
            }

            // Get a list of Travel documents
            agent.get('/api/travelDocuments')
              .end(function (travelDocumentsGetErr, travelDocumentsGetRes) {
                // Handle Travel documents save error
                if (travelDocumentsGetErr) {
                  return done(travelDocumentsGetErr);
                }

                // Get Travel documents list
                var travelDocuments = travelDocumentsGetRes.body;

                // Set assertions
                (travelDocuments[0].user._id).should.equal(userId);
                (travelDocuments[0].name).should.match('Travel document name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Travel document if not logged in', function (done) {
    agent.post('/api/travelDocuments')
      .send(travelDocument)
      .expect(403)
      .end(function (travelDocumentSaveErr, travelDocumentSaveRes) {
        // Call the assertion callback
        done(travelDocumentSaveErr);
      });
  });

  it('should not be able to save an Travel document if no name is provided', function (done) {
    // Invalidate name field
    travelDocument.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Travel document
        agent.post('/api/travelDocuments')
          .send(travelDocument)
          .expect(400)
          .end(function (travelDocumentSaveErr, travelDocumentSaveRes) {
            // Set message assertion
            (travelDocumentSaveRes.body.message).should.match('Please fill Travel document name');

            // Handle Travel document save error
            done(travelDocumentSaveErr);
          });
      });
  });

  it('should be able to update an Travel document if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Travel document
        agent.post('/api/travelDocuments')
          .send(travelDocument)
          .expect(200)
          .end(function (travelDocumentSaveErr, travelDocumentSaveRes) {
            // Handle Travel document save error
            if (travelDocumentSaveErr) {
              return done(travelDocumentSaveErr);
            }

            // Update Travel document name
            travelDocument.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Travel document
            agent.put('/api/travelDocuments/' + travelDocumentSaveRes.body._id)
              .send(travelDocument)
              .expect(200)
              .end(function (travelDocumentUpdateErr, travelDocumentUpdateRes) {
                // Handle Travel document update error
                if (travelDocumentUpdateErr) {
                  return done(travelDocumentUpdateErr);
                }

                // Set assertions
                (travelDocumentUpdateRes.body._id).should.equal(travelDocumentSaveRes.body._id);
                (travelDocumentUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Travel documents if not signed in', function (done) {
    // Create new Travel document model instance
    var travelDocumentObj = new TravelDocument(travelDocument);

    // Save the travelDocument
    travelDocumentObj.save(function () {
      // Request Travel documents
      request(app).get('/api/travelDocuments')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Travel document if not signed in', function (done) {
    // Create new Travel document model instance
    var travelDocumentObj = new TravelDocument(travelDocument);

    // Save the Travel document
    travelDocumentObj.save(function () {
      request(app).get('/api/travelDocuments/' + travelDocumentObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', travelDocument.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Travel document with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/travelDocuments/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Travel document is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Travel document which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Travel document
    request(app).get('/api/travelDocuments/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Travel document with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Travel document if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Travel document
        agent.post('/api/travelDocuments')
          .send(travelDocument)
          .expect(200)
          .end(function (travelDocumentSaveErr, travelDocumentSaveRes) {
            // Handle Travel document save error
            if (travelDocumentSaveErr) {
              return done(travelDocumentSaveErr);
            }

            // Delete an existing Travel document
            agent.delete('/api/travelDocuments/' + travelDocumentSaveRes.body._id)
              .send(travelDocument)
              .expect(200)
              .end(function (travelDocumentDeleteErr, travelDocumentDeleteRes) {
                // Handle travelDocument error error
                if (travelDocumentDeleteErr) {
                  return done(travelDocumentDeleteErr);
                }

                // Set assertions
                (travelDocumentDeleteRes.body._id).should.equal(travelDocumentSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Travel document if not signed in', function (done) {
    // Set Travel document user
    travelDocument.user = user;

    // Create new Travel document model instance
    var travelDocumentObj = new TravelDocument(travelDocument);

    // Save the Travel document
    travelDocumentObj.save(function () {
      // Try deleting Travel document
      request(app).delete('/api/travelDocuments/' + travelDocumentObj._id)
        .expect(403)
        .end(function (travelDocumentDeleteErr, travelDocumentDeleteRes) {
          // Set message assertion
          (travelDocumentDeleteRes.body.message).should.match('User is not authorized');

          // Handle Travel document error error
          done(travelDocumentDeleteErr);
        });

    });
  });

  it('should be able to get a single Travel document that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Travel document
          agent.post('/api/travelDocuments')
            .send(travelDocument)
            .expect(200)
            .end(function (travelDocumentSaveErr, travelDocumentSaveRes) {
              // Handle Travel document save error
              if (travelDocumentSaveErr) {
                return done(travelDocumentSaveErr);
              }

              // Set assertions on new Travel document
              (travelDocumentSaveRes.body.name).should.equal(travelDocument.name);
              should.exist(travelDocumentSaveRes.body.user);
              should.equal(travelDocumentSaveRes.body.user._id, orphanId);

              // force the Travel document to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Travel document
                    agent.get('/api/travelDocuments/' + travelDocumentSaveRes.body._id)
                      .expect(200)
                      .end(function (travelDocumentInfoErr, travelDocumentInfoRes) {
                        // Handle Travel document error
                        if (travelDocumentInfoErr) {
                          return done(travelDocumentInfoErr);
                        }

                        // Set assertions
                        (travelDocumentInfoRes.body._id).should.equal(travelDocumentSaveRes.body._id);
                        (travelDocumentInfoRes.body.name).should.equal(travelDocument.name);
                        should.equal(travelDocumentInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      TravelDocument.remove().exec(done);
    });
  });
});
