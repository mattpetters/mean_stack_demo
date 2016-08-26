'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Trip Schema
 */
var TripSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Trip name',
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

mongoose.model('Trip', TripSchema);
