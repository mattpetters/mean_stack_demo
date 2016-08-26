'use strict';

/**
 * Module dependencies
 */
var destinationsPolicy = require('../policies/destinations.server.policy'),
  destinations = require('../controllers/destinations.server.controller');

module.exports = function(app) {
  // Destinations Routes
  app.route('/api/destinations').all(destinationsPolicy.isAllowed)
    .get(destinations.list)
    .post(destinations.create);

  app.route('/api/destinations/:destinationId').all(destinationsPolicy.isAllowed)
    .get(destinations.read)
    .put(destinations.update)
    .delete(destinations.delete);

  // Finish by binding the Destination middleware
  app.param('destinationId', destinations.destinationByID);
};
