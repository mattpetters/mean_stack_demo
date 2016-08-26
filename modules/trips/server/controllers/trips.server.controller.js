'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Trip = mongoose.model('Trip'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Trip
 */
exports.create = function(req, res) {
  var trip = new Trip(req.body);
  trip.user = req.user;

  trip.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(trip);
    }
  });
};

/**
 * Show the current Trip
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var trip = req.trip ? req.trip.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  trip.isCurrentUserOwner = req.user && trip.user && trip.user._id.toString() === req.user._id.toString();

  res.jsonp(trip);
};

/**
 * Update a Trip
 */
exports.update = function(req, res) {
  var trip = req.trip;

  trip = _.extend(trip, req.body);

  trip.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(trip);
    }
  });
};

/**
 * Delete an Trip
 */
exports.delete = function(req, res) {
  var trip = req.trip;

  trip.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(trip);
    }
  });
};

/**
 * List of Trips
 */
exports.list = function(req, res) {
  Trip.find().sort('-created').populate('user', 'displayName').exec(function(err, trips) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(trips);
    }
  });
};

/**
 * Trip middleware
 */
exports.tripByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Trip is invalid'
    });
  }

  Trip.findById(id).populate('user', 'displayName').exec(function (err, trip) {
    if (err) {
      return next(err);
    } else if (!trip) {
      return res.status(404).send({
        message: 'No Trip with that identifier has been found'
      });
    }
    req.trip = trip;
    next();
  });
};
