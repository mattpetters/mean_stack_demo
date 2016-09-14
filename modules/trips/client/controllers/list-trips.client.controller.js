(function () {
  'use strict';

  angular
    .module('trips')
    .controller('TripsListController', TripsListController);

  TripsListController.$inject = ['TripsService', 'Authentication'];

  function TripsListController(TripsService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;

    var trips = TripsService.query();
    console.log(vm.authentication.user.id);
    //return only the trips which have the current user as a passenger
    for (var trip in trips) {
      for (var passenger in trip.passengers) {
        console.log(passenger._id);
        if (vm.authentication.user.id !== passenger._id) {
           var index = vm.trips.indexOf(trip);
            if (index > -1) {
              console.log("Got to the splicing part");
             trips.splice(index, 1);
          }
        }
    }
  }

  vm.trips = trips;
}
})();
