'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  TravelDocument = mongoose.model('TravelDocument');

/**
 * Globals
 */
var user,
  travelDocument;

/**
 * Unit tests
 */
describe('Travel document Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      travelDocument = new TravelDocument({
        name: 'Travel document Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return travelDocument.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      travelDocument.name = '';

      return travelDocument.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    TravelDocument.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
