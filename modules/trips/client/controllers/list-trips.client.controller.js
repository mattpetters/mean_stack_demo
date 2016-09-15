(function () {
  'use strict';

  angular
    .module('trips')
    .controller('TripsListController', TripsListController);

  TripsListController.$inject = ['TripsService', 'Authentication'];

  function TripsListController(TripsService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    var trips;
    //http://blog.ninja-squad.com/2015/05/28/angularjs-promises/
    TripsService.query().then(function(response) {
      var trips = response.data;
    });

      console.log(vm.authentication.user._id + " is the auth user id");
      //return only the trips which have the current user as a passenger
      for (var trip in trips) {
        console.log(trip + " is the trip");
        for (var passenger in trip.passengers) {
          console.log(passenger + " is the passenger");
          console.log(passenger._id + " is the passenger ID");
          if (vm.authentication.user._id !== passenger._id) {
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
