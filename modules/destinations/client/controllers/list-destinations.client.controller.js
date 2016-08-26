(function () {
  'use strict';

  angular
    .module('destinations')
    .controller('DestinationsListController', DestinationsListController);

  DestinationsListController.$inject = ['DestinationsService'];

  function DestinationsListController(DestinationsService) {
    var vm = this;

    vm.destinations = DestinationsService.query();
  }
}());
