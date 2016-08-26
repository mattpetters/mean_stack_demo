// Trips service used to communicate Trips REST endpoints
(function () {
  'use strict';

  angular
    .module('trips')
    .factory('TripsService', TripsService);

  TripsService.$inject = ['$resource'];

  function TripsService($resource) {
    return $resource('api/trips/:tripId', {
      tripId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
