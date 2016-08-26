// Travel documents service used to communicate Travel documents REST endpoints
(function () {
  'use strict';

  angular
    .module('travel-documents')
    .factory('TravelDocumentsService', TravelDocumentsService);

  TravelDocumentsService.$inject = ['$resource'];

  function TravelDocumentsService($resource) {
    return $resource('api/travel-documents/:travelDocumentId', {
      travelDocumentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
