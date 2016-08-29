(function () {
  'use strict';

  angular
    .module('travel-documents')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('travel-documents', {
        abstract: true,
        url: '/travel-documents',
        template: '<ui-view/>'
      })
      .state('travel-documents.list', {
        url: '',
        templateUrl: 'modules/travel-documents/client/views/list-travel-documents.client.view.html',
        controller: 'TravelDocumentsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Travel documents List'
        }
      })
      .state('travel-documents.create', {
        url: '/create',
        templateUrl: 'modules/travel-documents/client/views/form-travel-document.client.view.html',
        controller: 'TravelDocumentsController',
        controllerAs: 'vm',
        resolve: {
          traveldocumentResolve: newTravelDocument
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Travel documents Create'
        }
      })
      .state('travel-documents.edit', {
        url: '/:travelDocumentId/edit',
        templateUrl: 'modules/travel-documents/client/views/form-travel-document.client.view.html',
        controller: 'TravelDocumentsController',
        controllerAs: 'vm',
        resolve: {
          traveldocumentResolve: getTravelDocument
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Travel document {{ travel-documentResolve.name }}'
        }
      })
      .state('travel-documents.view', {
        url: '/:travelDocumentId',
        templateUrl: 'modules/travel-documents/client/views/view-travel-document.client.view.html',
        controller: 'TravelDocumentsController',
        controllerAs: 'vm',
        resolve: {
          traveldocumentResolve: getTravelDocument
        },
        data: {
          pageTitle: 'Travel document {{ travel-documentResolve.name }}'
        }
      });
  }

  getTravelDocument.$inject = ['$stateParams', 'TravelDocumentsService'];

  function getTravelDocument($stateParams, TravelDocumentsService) {
    return TravelDocumentsService.get({
      travelDocumentId: $stateParams.travelDocumentId
    }).$promise;
  }

  newTravelDocument.$inject = ['TravelDocumentsService'];

  function newTravelDocument(TravelDocumentsService) {
    return new TravelDocumentsService();
  }
}());
