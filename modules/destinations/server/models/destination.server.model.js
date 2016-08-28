'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Destination Schema
 */
var DestinationSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Destination name',
    trim: true
  },
});

mongoose.model('Destination', DestinationSchema);
