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
    $scope.about = { title: 'About Us', body:'<a target="_blank" href="#">Tripzilla</a> is a Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id itaque molestias soluta vero voluptatibus. Cumque dolores molestiae nostrum nulla odit recusandae reiciendis! Dicta explicabo illum nihil nulla numquam quas tempore?' };
    $scope.sites = { title:'Our Sites', body:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam asperiores at debitis, delectus deserunt dolores dolorum e' };
    $scope.renderHtml = function (html) {
        return $sce.trustAsHtml(html);
    };
}
]);
