// Bills service used to communicate Bills REST endpoints
(function () {
  'use strict';

  angular
    .module('bills')
    .factory('BillsService', BillsService);

  BillsService.$inject = ['$resource'];

  function BillsService($resource) {
    return $resource('api/bills/:billId', {
      billId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
