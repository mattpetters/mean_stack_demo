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
  departureDate: { type: Date, default: Date.now },
  returnDate: { type: Date, default: Date.now },
  description: {
    type: String,
    default: '',
    required: 'Please provide a description',
    trim: true
  },
  destination: {
    type: String,
    default: 'Atlanta, GA',
    required: 'Please write a destination'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  },
  passengers: [{
      type: Schema.ObjectId,
      ref:'User'
  }]
});

mongoose.model('Trip', TripSchema);
