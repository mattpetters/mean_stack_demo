(function () {
  'use strict';

  angular
    .module('bills')
    .controller('BillsListController', BillsListController);

  BillsListController.$inject = ['BillsService'];

  function BillsListController(BillsService) {
    var vm = this;

    vm.bills = BillsService.query();
  }
}());
