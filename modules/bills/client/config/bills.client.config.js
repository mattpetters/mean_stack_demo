(function () {
  'use strict';

  angular
    .module('bills')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Bills',
      state: 'bills',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'bills', {
      title: 'List Bills',
      state: 'bills.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'bills', {
      title: 'Create Bill',
      state: 'bills.create',
      roles: ['admin']
    });
  }
}());
