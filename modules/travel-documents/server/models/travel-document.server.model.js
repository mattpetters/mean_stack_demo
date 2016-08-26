'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Travel document Schema
 */
var TravelDocumentSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Travel document name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('TravelDocument', TravelDocumentSchema);
