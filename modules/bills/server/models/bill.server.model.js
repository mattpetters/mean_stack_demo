'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Bill Schema
 */
var BillSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Bill name',
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

mongoose.model('Bill', BillSchema);
