'use strict';

/**
 * Module dependencies
 */
var billsPolicy = require('../policies/bills.server.policy'),
  bills = require('../controllers/bills.server.controller');

module.exports = function(app) {
  // Bills Routes
  app.route('/api/bills').all(billsPolicy.isAllowed)
    .get(bills.list)
    .post(bills.create);

  app.route('/api/bills/:billId').all(billsPolicy.isAllowed)
    .get(bills.read)
    .put(bills.update)
    .delete(bills.delete);

  // Finish by binding the Bill middleware
  app.param('billId', bills.billByID);
};
