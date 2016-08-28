(function () {
  'use strict';

  angular
    .module('bills')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('bills', {
        abstract: true,
        url: '/bills',
        template: '<ui-view/>'
      })
      .state('bills.list', {
        url: '',
        templateUrl: 'modules/bills/client/views/list-bills.client.view.html',
        controller: 'BillsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Bills List'
        }
      })
      .state('bills.create', {
        url: '/create',
        templateUrl: 'modules/bills/client/views/form-bill.client.view.html',
        controller: 'BillsController',
        controllerAs: 'vm',
        resolve: {
          billResolve: newBill
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Bills Create'
        }
      })
      .state('bills.edit', {
        url: '/:billId/edit',
        templateUrl: 'modules/bills/client/views/form-bill.client.view.html',
        controller: 'BillsController',
        controllerAs: 'vm',
        resolve: {
          billResolve: getBill
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Bill {{ billResolve.name }}'
        }
      })
      .state('bills.view', {
        url: '/:billId',
        templateUrl: 'modules/bills/client/views/view-bill.client.view.html',
        controller: 'BillsController',
        controllerAs: 'vm',
        resolve: {
          billResolve: getBill
        },
        data: {
          pageTitle: 'Bill {{ billResolve.name }}'
        }
      });
  }

  getBill.$inject = ['$stateParams', 'BillsService'];

  function getBill($stateParams, BillsService) {
    return BillsService.get({
      billId: $stateParams.billId
    }).$promise;
  }

  newBill.$inject = ['BillsService'];

  function newBill(BillsService) {
    return new BillsService();
  }
}());
