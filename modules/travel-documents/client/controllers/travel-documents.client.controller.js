(function () {
  'use strict';

  // Travel documents controller
  angular
    .module('travel-documents')
    .controller('TravelDocumentsController', TravelDocumentsController);

  TravelDocumentsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'travelDocumentResolve'];

  function TravelDocumentsController ($scope, $state, $window, Authentication, travelDocument) {
    var vm = this;

    vm.authentication = Authentication;
    vm.travelDocument = travelDocument;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Travel document
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.travelDocument.$remove($state.go('travel-documents.list'));
      }
    }

    // Save Travel document
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.travelDocumentForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.travelDocument._id) {
        vm.travelDocument.$update(successCallback, errorCallback);
      } else {
        vm.travelDocument.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('travel-documents.view', {
          travelDocumentId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
