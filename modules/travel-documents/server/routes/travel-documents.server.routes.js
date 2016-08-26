'use strict';

/**
 * Module dependencies
 */
var travelDocumentsPolicy = require('../policies/travel-documents.server.policy'),
  travelDocuments = require('../controllers/travel-documents.server.controller');

module.exports = function(app) {
  // Travel documents Routes
  app.route('/api/travel-documents').all(travelDocumentsPolicy.isAllowed)
    .get(travelDocuments.list)
    .post(travelDocuments.create);

  app.route('/api/travel-documents/:travelDocumentId').all(travelDocumentsPolicy.isAllowed)
    .get(travelDocuments.read)
    .put(travelDocuments.update)
    .delete(travelDocuments.delete);

  // Finish by binding the Travel document middleware
  app.param('travelDocumentId', travelDocuments.travelDocumentByID);
};
