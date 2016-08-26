'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Destination = mongoose.model('Destination'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  destination;

/**
 * Destination routes tests
 */
describe('Destination CRUD tests', function () {

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

    // Save a user to the test db and create new Destination
    user.save(function () {
      destination = {
        name: 'Destination name'
      };

      done();
    });
  });

  it('should be able to save a Destination if logged in', function (done) {
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

        // Save a new Destination
        agent.post('/api/destinations')
          .send(destination)
          .expect(200)
          .end(function (destinationSaveErr, destinationSaveRes) {
            // Handle Destination save error
            if (destinationSaveErr) {
              return done(destinationSaveErr);
            }

            // Get a list of Destinations
            agent.get('/api/destinations')
              .end(function (destinationsGetErr, destinationsGetRes) {
                // Handle Destinations save error
                if (destinationsGetErr) {
                  return done(destinationsGetErr);
                }

                // Get Destinations list
                var destinations = destinationsGetRes.body;

                // Set assertions
                (destinations[0].user._id).should.equal(userId);
                (destinations[0].name).should.match('Destination name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Destination if not logged in', function (done) {
    agent.post('/api/destinations')
      .send(destination)
      .expect(403)
      .end(function (destinationSaveErr, destinationSaveRes) {
        // Call the assertion callback
        done(destinationSaveErr);
      });
  });

  it('should not be able to save an Destination if no name is provided', function (done) {
    // Invalidate name field
    destination.name = '';

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

        // Save a new Destination
        agent.post('/api/destinations')
          .send(destination)
          .expect(400)
          .end(function (destinationSaveErr, destinationSaveRes) {
            // Set message assertion
            (destinationSaveRes.body.message).should.match('Please fill Destination name');

            // Handle Destination save error
            done(destinationSaveErr);
          });
      });
  });

  it('should be able to update an Destination if signed in', function (done) {
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

        // Save a new Destination
        agent.post('/api/destinations')
          .send(destination)
          .expect(200)
          .end(function (destinationSaveErr, destinationSaveRes) {
            // Handle Destination save error
            if (destinationSaveErr) {
              return done(destinationSaveErr);
            }

            // Update Destination name
            destination.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Destination
            agent.put('/api/destinations/' + destinationSaveRes.body._id)
              .send(destination)
              .expect(200)
              .end(function (destinationUpdateErr, destinationUpdateRes) {
                // Handle Destination update error
                if (destinationUpdateErr) {
                  return done(destinationUpdateErr);
                }

                // Set assertions
                (destinationUpdateRes.body._id).should.equal(destinationSaveRes.body._id);
                (destinationUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Destinations if not signed in', function (done) {
    // Create new Destination model instance
    var destinationObj = new Destination(destination);

    // Save the destination
    destinationObj.save(function () {
      // Request Destinations
      request(app).get('/api/destinations')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Destination if not signed in', function (done) {
    // Create new Destination model instance
    var destinationObj = new Destination(destination);

    // Save the Destination
    destinationObj.save(function () {
      request(app).get('/api/destinations/' + destinationObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', destination.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Destination with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/destinations/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Destination is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Destination which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Destination
    request(app).get('/api/destinations/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Destination with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Destination if signed in', function (done) {
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

        // Save a new Destination
        agent.post('/api/destinations')
          .send(destination)
          .expect(200)
          .end(function (destinationSaveErr, destinationSaveRes) {
            // Handle Destination save error
            if (destinationSaveErr) {
              return done(destinationSaveErr);
            }

            // Delete an existing Destination
            agent.delete('/api/destinations/' + destinationSaveRes.body._id)
              .send(destination)
              .expect(200)
              .end(function (destinationDeleteErr, destinationDeleteRes) {
                // Handle destination error error
                if (destinationDeleteErr) {
                  return done(destinationDeleteErr);
                }

                // Set assertions
                (destinationDeleteRes.body._id).should.equal(destinationSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Destination if not signed in', function (done) {
    // Set Destination user
    destination.user = user;

    // Create new Destination model instance
    var destinationObj = new Destination(destination);

    // Save the Destination
    destinationObj.save(function () {
      // Try deleting Destination
      request(app).delete('/api/destinations/' + destinationObj._id)
        .expect(403)
        .end(function (destinationDeleteErr, destinationDeleteRes) {
          // Set message assertion
          (destinationDeleteRes.body.message).should.match('User is not authorized');

          // Handle Destination error error
          done(destinationDeleteErr);
        });

    });
  });

  it('should be able to get a single Destination that has an orphaned user reference', function (done) {
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

          // Save a new Destination
          agent.post('/api/destinations')
            .send(destination)
            .expect(200)
            .end(function (destinationSaveErr, destinationSaveRes) {
              // Handle Destination save error
              if (destinationSaveErr) {
                return done(destinationSaveErr);
              }

              // Set assertions on new Destination
              (destinationSaveRes.body.name).should.equal(destination.name);
              should.exist(destinationSaveRes.body.user);
              should.equal(destinationSaveRes.body.user._id, orphanId);

              // force the Destination to have an orphaned user reference
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

                    // Get the Destination
                    agent.get('/api/destinations/' + destinationSaveRes.body._id)
                      .expect(200)
                      .end(function (destinationInfoErr, destinationInfoRes) {
                        // Handle Destination error
                        if (destinationInfoErr) {
                          return done(destinationInfoErr);
                        }

                        // Set assertions
                        (destinationInfoRes.body._id).should.equal(destinationSaveRes.body._id);
                        (destinationInfoRes.body.name).should.equal(destination.name);
                        should.equal(destinationInfoRes.body.user, undefined);

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
      Destination.remove().exec(done);
    });
  });
});
