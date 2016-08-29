(function () {
  'use strict';

  // Trips controller
  angular
    .module('trips')
    .controller('TripsController', TripsController);

  TripsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'tripResolve', 'Users'];

  function TripsController ($scope, $state, $window, Authentication, trip, Users) {
    var vm = this;

    vm.authentication = Authentication;
    vm.trip = trip;
    vm.error = null;
    vm.form = {};
    vm.passengersToAdd = [];
    vm.remove = remove;
    vm.save = save;

      Users.query(function (data) {
          vm.users = data;
      });

    // //query for users and set to scope
      vm.loadUsers = function($query) {
          console.log(vm.trip.passengers);
          return vm.users;
      };

    //TODO: Write function that matches all the display names in passengersToAdd to user objects and adds those users to the vm.trip.passengers array




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
