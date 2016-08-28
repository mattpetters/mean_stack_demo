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
  description: {
    type: String,
    default: '',
    required: 'Please provide a description',
    trim: true
  },
  destination: {
    type: Schema.ObjectId,
    ref: 'Destination'
  },
  created: {
    type: Date,
    default: Date.now
  },
  passengers: [ { type: Schema.ObjectId, ref:'User' } ],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Trip', TripSchema);
