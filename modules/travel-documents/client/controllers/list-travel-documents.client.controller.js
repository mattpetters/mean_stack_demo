(function () {
  'use strict';

  angular
    .module('travel-documents')
    .controller('TravelDocumentsListController', TravelDocumentsListController);

  TravelDocumentsListController.$inject = ['TravelDocumentsService'];

  function TravelDocumentsListController(TravelDocumentsService) {
    var vm = this;

    vm.travelDocuments = TravelDocumentsService.query();
  }
}());
