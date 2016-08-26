'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Destination = mongoose.model('Destination'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Destination
 */
exports.create = function(req, res) {
  var destination = new Destination(req.body);
  destination.user = req.user;

  destination.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(destination);
    }
  });
};

/**
 * Show the current Destination
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var destination = req.destination ? req.destination.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  destination.isCurrentUserOwner = req.user && destination.user && destination.user._id.toString() === req.user._id.toString();

  res.jsonp(destination);
};

/**
 * Update a Destination
 */
exports.update = function(req, res) {
  var destination = req.destination;

  destination = _.extend(destination, req.body);

  destination.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(destination);
    }
  });
};

/**
 * Delete an Destination
 */
exports.delete = function(req, res) {
  var destination = req.destination;

  destination.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(destination);
    }
  });
};

/**
 * List of Destinations
 */
exports.list = function(req, res) {
  Destination.find().sort('-created').populate('user', 'displayName').exec(function(err, destinations) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(destinations);
    }
  });
};

/**
 * Destination middleware
 */
exports.destinationByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Destination is invalid'
    });
  }

  Destination.findById(id).populate('user', 'displayName').exec(function (err, destination) {
    if (err) {
      return next(err);
    } else if (!destination) {
      return res.status(404).send({
        message: 'No Destination with that identifier has been found'
      });
    }
    req.destination = destination;
    next();
  });
};
