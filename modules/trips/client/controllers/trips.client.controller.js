(function () {
  'use strict';

  // Trips controller
  angular
    .module('trips')
    .controller('TripsController', TripsController);

  TripsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'tripResolve'];

  function TripsController ($scope, $state, $window, Authentication, trip) {
    var vm = this;

    vm.authentication = Authentication;
    vm.trip = trip;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Trip
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.trip.$remove($state.go('trips.list'));
      }
    }

    // Save Trip
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.tripForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.trip._id) {
        vm.trip.$update(successCallback, errorCallback);
      } else {
        vm.trip.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('trips.view', {
          tripId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
