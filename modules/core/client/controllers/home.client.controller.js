'use strict';

angular.module('core').controller('HomeController', ['$scope', '$sce', 'Authentication',
  function ($scope, $sce, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.userLoggedIn = Authentication.user;
    if (Authentication.user) {
      $scope.adminUser = Authentication.user.roles.indexOf('admin') !== -1;
    }
    console.log(Authentication.user);
    $scope.about = { title: 'About Us', body:'<a target="_blank" href="#">Tripzilla</a> is an artifical platform for booking fake trips for imaginary customers. We allow our false users to have the greatest overall experiences in their whole non-lives.' };
    $scope.sites = { title:'Our Sites', body:'Our sites don\'t exist, but if they did, they\'d be great and would be linked to right here.'};
    $scope.renderHtml = function (html) {
        return $sce.trustAsHtml(html);
    };
}
]);
