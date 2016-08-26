(function () {
  'use strict';

  // Destinations controller
  angular
    .module('destinations')
    .controller('DestinationsController', DestinationsController);

  DestinationsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'destinationResolve'];

  function DestinationsController ($scope, $state, $window, Authentication, destination) {
    var vm = this;

    vm.authentication = Authentication;
    vm.destination = destination;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Destination
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.destination.$remove($state.go('destinations.list'));
      }
    }

    // Save Destination
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.destinationForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.destination._id) {
        vm.destination.$update(successCallback, errorCallback);
      } else {
        vm.destination.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('destinations.view', {
          destinationId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
