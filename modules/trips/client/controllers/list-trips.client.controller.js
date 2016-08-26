(function () {
  'use strict';

  angular
    .module('trips')
    .controller('TripsListController', TripsListController);

  TripsListController.$inject = ['TripsService'];

  function TripsListController(TripsService) {
    var vm = this;

    vm.trips = TripsService.query();
  }
}());
