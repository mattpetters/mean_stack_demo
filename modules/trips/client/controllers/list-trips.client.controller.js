(function () {
  'use strict';

  angular
    .module('trips')
    .controller('TripsListController', TripsListController);

  TripsListController.$inject = ['TripsService', 'Authentication'];

  function TripsListController(TripsService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;

    vm.trips = TripsService.query();
    //return only the trips which have the current user as a passenger
  }
}());
