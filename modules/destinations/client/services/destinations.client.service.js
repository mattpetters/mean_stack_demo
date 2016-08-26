// Destinations service used to communicate Destinations REST endpoints
(function () {
  'use strict';

  angular
    .module('destinations')
    .factory('DestinationsService', DestinationsService);

  DestinationsService.$inject = ['$resource'];

  function DestinationsService($resource) {
    return $resource('api/destinations/:destinationId', {
      destinationId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
