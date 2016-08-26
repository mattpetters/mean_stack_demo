'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Bill = mongoose.model('Bill'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Bill
 */
exports.create = function(req, res) {
  var bill = new Bill(req.body);
  bill.user = req.user;

  bill.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(bill);
    }
  });
};

/**
 * Show the current Bill
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var bill = req.bill ? req.bill.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  bill.isCurrentUserOwner = req.user && bill.user && bill.user._id.toString() === req.user._id.toString();

  res.jsonp(bill);
};

/**
 * Update a Bill
 */
exports.update = function(req, res) {
  var bill = req.bill;

  bill = _.extend(bill, req.body);

  bill.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(bill);
    }
  });
};

/**
 * Delete an Bill
 */
exports.delete = function(req, res) {
  var bill = req.bill;

  bill.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(bill);
    }
  });
};

/**
 * List of Bills
 */
exports.list = function(req, res) {
  Bill.find().sort('-created').populate('user', 'displayName').exec(function(err, bills) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(bills);
    }
  });
};

/**
 * Bill middleware
 */
exports.billByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Bill is invalid'
    });
  }

  Bill.findById(id).populate('user', 'displayName').exec(function (err, bill) {
    if (err) {
      return next(err);
    } else if (!bill) {
      return res.status(404).send({
        message: 'No Bill with that identifier has been found'
      });
    }
    req.bill = bill;
    next();
  });
};
