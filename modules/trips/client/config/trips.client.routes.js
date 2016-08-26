(function () {
  'use strict';

  angular
    .module('trips')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('trips', {
        abstract: true,
        url: '/trips',
        template: '<ui-view/>'
      })
      .state('trips.list', {
        url: '',
        templateUrl: 'modules/trips/client/views/list-trips.client.view.html',
        controller: 'TripsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Trips List'
        }
      })
      .state('trips.create', {
        url: '/create',
        templateUrl: 'modules/trips/client/views/form-trip.client.view.html',
        controller: 'TripsController',
        controllerAs: 'vm',
        resolve: {
          tripResolve: newTrip
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Trips Create'
        }
      })
      .state('trips.edit', {
        url: '/:tripId/edit',
        templateUrl: 'modules/trips/client/views/form-trip.client.view.html',
        controller: 'TripsController',
        controllerAs: 'vm',
        resolve: {
          tripResolve: getTrip
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Trip {{ tripResolve.name }}'
        }
      })
      .state('trips.view', {
        url: '/:tripId',
        templateUrl: 'modules/trips/client/views/view-trip.client.view.html',
        controller: 'TripsController',
        controllerAs: 'vm',
        resolve: {
          tripResolve: getTrip
        },
        data: {
          pageTitle: 'Trip {{ tripResolve.name }}'
        }
      });
  }

  getTrip.$inject = ['$stateParams', 'TripsService'];

  function getTrip($stateParams, TripsService) {
    return TripsService.get({
      tripId: $stateParams.tripId
    }).$promise;
  }

  newTrip.$inject = ['TripsService'];

  function newTrip(TripsService) {
    return new TripsService();
  }
}());
