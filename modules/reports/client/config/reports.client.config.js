(function () {
  'use strict';

  angular
    .module('reports')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Reports',
      state: 'reports',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'reports', {
      title: 'List Reports',
      state: 'reports.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'reports', {
      title: 'Create Report',
      state: 'reports.create',
      roles: ['admin']
    });
  }
}());
