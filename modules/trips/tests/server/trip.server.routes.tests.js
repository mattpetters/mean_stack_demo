'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Trip = mongoose.model('Trip'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  trip;

/**
 * Trip routes tests
 */
describe('Trip CRUD tests', function () {

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

    // Save a user to the test db and create new Trip
    user.save(function () {
      trip = {
        name: 'Trip name'
      };

      done();
    });
  });

  it('should be able to save a Trip if logged in', function (done) {
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

        // Save a new Trip
        agent.post('/api/trips')
          .send(trip)
          .expect(200)
          .end(function (tripSaveErr, tripSaveRes) {
            // Handle Trip save error
            if (tripSaveErr) {
              return done(tripSaveErr);
            }

            // Get a list of Trips
            agent.get('/api/trips')
              .end(function (tripsGetErr, tripsGetRes) {
                // Handle Trips save error
                if (tripsGetErr) {
                  return done(tripsGetErr);
                }

                // Get Trips list
                var trips = tripsGetRes.body;

                // Set assertions
                (trips[0].user._id).should.equal(userId);
                (trips[0].name).should.match('Trip name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Trip if not logged in', function (done) {
    agent.post('/api/trips')
      .send(trip)
      .expect(403)
      .end(function (tripSaveErr, tripSaveRes) {
        // Call the assertion callback
        done(tripSaveErr);
      });
  });

  it('should not be able to save an Trip if no name is provided', function (done) {
    // Invalidate name field
    trip.name = '';

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

        // Save a new Trip
        agent.post('/api/trips')
          .send(trip)
          .expect(400)
          .end(function (tripSaveErr, tripSaveRes) {
            // Set message assertion
            (tripSaveRes.body.message).should.match('Please fill Trip name');

            // Handle Trip save error
            done(tripSaveErr);
          });
      });
  });

  it('should be able to update an Trip if signed in', function (done) {
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

        // Save a new Trip
        agent.post('/api/trips')
          .send(trip)
          .expect(200)
          .end(function (tripSaveErr, tripSaveRes) {
            // Handle Trip save error
            if (tripSaveErr) {
              return done(tripSaveErr);
            }

            // Update Trip name
            trip.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Trip
            agent.put('/api/trips/' + tripSaveRes.body._id)
              .send(trip)
              .expect(200)
              .end(function (tripUpdateErr, tripUpdateRes) {
                // Handle Trip update error
                if (tripUpdateErr) {
                  return done(tripUpdateErr);
                }

                // Set assertions
                (tripUpdateRes.body._id).should.equal(tripSaveRes.body._id);
                (tripUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Trips if not signed in', function (done) {
    // Create new Trip model instance
    var tripObj = new Trip(trip);

    // Save the trip
    tripObj.save(function () {
      // Request Trips
      request(app).get('/api/trips')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Trip if not signed in', function (done) {
    // Create new Trip model instance
    var tripObj = new Trip(trip);

    // Save the Trip
    tripObj.save(function () {
      request(app).get('/api/trips/' + tripObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', trip.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Trip with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/trips/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Trip is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Trip which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Trip
    request(app).get('/api/trips/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Trip with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Trip if signed in', function (done) {
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

        // Save a new Trip
        agent.post('/api/trips')
          .send(trip)
          .expect(200)
          .end(function (tripSaveErr, tripSaveRes) {
            // Handle Trip save error
            if (tripSaveErr) {
              return done(tripSaveErr);
            }

            // Delete an existing Trip
            agent.delete('/api/trips/' + tripSaveRes.body._id)
              .send(trip)
              .expect(200)
              .end(function (tripDeleteErr, tripDeleteRes) {
                // Handle trip error error
                if (tripDeleteErr) {
                  return done(tripDeleteErr);
                }

                // Set assertions
                (tripDeleteRes.body._id).should.equal(tripSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Trip if not signed in', function (done) {
    // Set Trip user
    trip.user = user;

    // Create new Trip model instance
    var tripObj = new Trip(trip);

    // Save the Trip
    tripObj.save(function () {
      // Try deleting Trip
      request(app).delete('/api/trips/' + tripObj._id)
        .expect(403)
        .end(function (tripDeleteErr, tripDeleteRes) {
          // Set message assertion
          (tripDeleteRes.body.message).should.match('User is not authorized');

          // Handle Trip error error
          done(tripDeleteErr);
        });

    });
  });

  it('should be able to get a single Trip that has an orphaned user reference', function (done) {
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

          // Save a new Trip
          agent.post('/api/trips')
            .send(trip)
            .expect(200)
            .end(function (tripSaveErr, tripSaveRes) {
              // Handle Trip save error
              if (tripSaveErr) {
                return done(tripSaveErr);
              }

              // Set assertions on new Trip
              (tripSaveRes.body.name).should.equal(trip.name);
              should.exist(tripSaveRes.body.user);
              should.equal(tripSaveRes.body.user._id, orphanId);

              // force the Trip to have an orphaned user reference
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

                    // Get the Trip
                    agent.get('/api/trips/' + tripSaveRes.body._id)
                      .expect(200)
                      .end(function (tripInfoErr, tripInfoRes) {
                        // Handle Trip error
                        if (tripInfoErr) {
                          return done(tripInfoErr);
                        }

                        // Set assertions
                        (tripInfoRes.body._id).should.equal(tripSaveRes.body._id);
                        (tripInfoRes.body.name).should.equal(trip.name);
                        should.equal(tripInfoRes.body.user, undefined);

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
      Trip.remove().exec(done);
    });
  });
});
