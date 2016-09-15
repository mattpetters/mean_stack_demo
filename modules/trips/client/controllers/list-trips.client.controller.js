(function () {
  'use strict';

  angular
    .module('trips')
    .controller('TripsListController', TripsListController);

  TripsListController.$inject = ['TripsService', 'Authentication', '$filter'];

  function TripsListController(TripsService, Authentication, $filter) {
    var vm = this;
    vm.authentication = Authentication;
    //http://blog.ninja-squad.com/2015/05/28/angularjs-promises/
    //filtering from resource - http://stackoverflow.com/questions/28906953/filters-not-working-on-array-from-resource
    //creating filters correctly - http://stackoverflow.com/questions/20292638/angular-filter-exactly-on-object-key
    TripsService.query().$promise.then(function(response) {
      // console.log(vm.authentication.user._id + " is the auth user id");
      //return only the trips which have the current user as a passenger
      // for (var trip in trips) {
      //   console.log(trip.name + " is the trip");
      //   for (var passenger in trip.passengers) {
      //     console.log(passenger.displayName + " is the passenger");
      //     console.log(passenger._id + " is the passenger ID");
      //     if (vm.authentication.user._id !== passenger._id) {
      //       console.log(vm.authentication.user._id !== passenger._id);
      //       var index = vm.trips.indexOf(trip);
      //       if (index > -1) {
      //         console.log("Got to the splicing part");
      //         trips.splice(index, 1);
      //       }
      //     }
      //   }
      // }
      vm.trips = response;
      vm.userId = vm.authentication.user._id;
    });


}
})();
