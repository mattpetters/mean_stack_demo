(function () {
  'use strict';

  // Bills controller
  angular
    .module('bills')
    .controller('BillsController', BillsController);

  BillsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'billResolve'];

  function BillsController ($scope, $state, $window, Authentication, bill) {
    var vm = this;

    vm.authentication = Authentication;
    vm.bill = bill;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Bill
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.bill.$remove($state.go('bills.list'));
      }
    }

    // Save Bill
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.billForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.bill._id) {
        vm.bill.$update(successCallback, errorCallback);
      } else {
        vm.bill.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('bills.view', {
          billId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
