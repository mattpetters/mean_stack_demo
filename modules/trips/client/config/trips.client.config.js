(function () {
  'use strict';

  angular
    .module('trips')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Trips',
      state: 'trips',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'trips', {
      title: 'List Trips',
      state: 'trips.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'trips', {
      title: 'Create Trip',
      state: 'trips.create',
      roles: ['user']
    });
  }
}());
