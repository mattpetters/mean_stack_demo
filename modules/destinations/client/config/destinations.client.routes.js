(function () {
  'use strict';

  angular
    .module('destinations')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('destinations', {
        abstract: true,
        url: '/destinations',
        template: '<ui-view/>'
      })
      .state('destinations.list', {
        url: '',
        templateUrl: 'modules/destinations/client/views/list-destinations.client.view.html',
        controller: 'DestinationsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Destinations List'
        }
      })
      .state('destinations.create', {
        url: '/create',
        templateUrl: 'modules/destinations/client/views/form-destination.client.view.html',
        controller: 'DestinationsController',
        controllerAs: 'vm',
        resolve: {
          destinationResolve: newDestination
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Destinations Create'
        }
      })
      .state('destinations.edit', {
        url: '/:destinationId/edit',
        templateUrl: 'modules/destinations/client/views/form-destination.client.view.html',
        controller: 'DestinationsController',
        controllerAs: 'vm',
        resolve: {
          destinationResolve: getDestination
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Destination {{ destinationResolve.name }}'
        }
      })
      .state('destinations.view', {
        url: '/:destinationId',
        templateUrl: 'modules/destinations/client/views/view-destination.client.view.html',
        controller: 'DestinationsController',
        controllerAs: 'vm',
        resolve: {
          destinationResolve: getDestination
        },
        data: {
          pageTitle: 'Destination {{ destinationResolve.name }}'
        }
      });
  }

  getDestination.$inject = ['$stateParams', 'DestinationsService'];

  function getDestination($stateParams, DestinationsService) {
    return DestinationsService.get({
      destinationId: $stateParams.destinationId
    }).$promise;
  }

  newDestination.$inject = ['DestinationsService'];

  function newDestination(DestinationsService) {
    return new DestinationsService();
  }
}());
