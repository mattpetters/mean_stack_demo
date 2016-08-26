'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  TravelDocument = mongoose.model('TravelDocument'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Travel document
 */
exports.create = function(req, res) {
  var travelDocument = new TravelDocument(req.body);
  travelDocument.user = req.user;

  travelDocument.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(travelDocument);
    }
  });
};

/**
 * Show the current Travel document
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var travelDocument = req.travelDocument ? req.travelDocument.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  travelDocument.isCurrentUserOwner = req.user && travelDocument.user && travelDocument.user._id.toString() === req.user._id.toString();

  res.jsonp(travelDocument);
};

/**
 * Update a Travel document
 */
exports.update = function(req, res) {
  var travelDocument = req.travelDocument;

  travelDocument = _.extend(travelDocument, req.body);

  travelDocument.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(travelDocument);
    }
  });
};

/**
 * Delete an Travel document
 */
exports.delete = function(req, res) {
  var travelDocument = req.travelDocument;

  travelDocument.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(travelDocument);
    }
  });
};

/**
 * List of Travel documents
 */
exports.list = function(req, res) {
  TravelDocument.find().sort('-created').populate('user', 'displayName').exec(function(err, travelDocuments) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(travelDocuments);
    }
  });
};

/**
 * Travel document middleware
 */
exports.travelDocumentByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Travel document is invalid'
    });
  }

  TravelDocument.findById(id).populate('user', 'displayName').exec(function (err, travelDocument) {
    if (err) {
      return next(err);
    } else if (!travelDocument) {
      return res.status(404).send({
        message: 'No Travel document with that identifier has been found'
      });
    }
    req.travelDocument = travelDocument;
    next();
  });
};
