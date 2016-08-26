(function () {
  'use strict';

  angular
    .module('destinations')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Destinations',
      state: 'destinations',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'destinations', {
      title: 'List Destinations',
      state: 'destinations.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'destinations', {
      title: 'Create Destination',
      state: 'destinations.create',
      roles: ['user']
    });
  }
}());
