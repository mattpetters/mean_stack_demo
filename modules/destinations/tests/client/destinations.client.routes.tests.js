(function () {
  'use strict';

  describe('Destinations Route Tests', function () {
    // Initialize global variables
    var $scope,
      DestinationsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _DestinationsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      DestinationsService = _DestinationsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('destinations');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/destinations');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          DestinationsController,
          mockDestination;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('destinations.view');
          $templateCache.put('modules/destinations/client/views/view-destination.client.view.html', '');

          // create mock Destination
          mockDestination = new DestinationsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Destination Name'
          });

          // Initialize Controller
          DestinationsController = $controller('DestinationsController as vm', {
            $scope: $scope,
            destinationResolve: mockDestination
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:destinationId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.destinationResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            destinationId: 1
          })).toEqual('/destinations/1');
        }));

        it('should attach an Destination to the controller scope', function () {
          expect($scope.vm.destination._id).toBe(mockDestination._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/destinations/client/views/view-destination.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          DestinationsController,
          mockDestination;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('destinations.create');
          $templateCache.put('modules/destinations/client/views/form-destination.client.view.html', '');

          // create mock Destination
          mockDestination = new DestinationsService();

          // Initialize Controller
          DestinationsController = $controller('DestinationsController as vm', {
            $scope: $scope,
            destinationResolve: mockDestination
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.destinationResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/destinations/create');
        }));

        it('should attach an Destination to the controller scope', function () {
          expect($scope.vm.destination._id).toBe(mockDestination._id);
          expect($scope.vm.destination._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/destinations/client/views/form-destination.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          DestinationsController,
          mockDestination;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('destinations.edit');
          $templateCache.put('modules/destinations/client/views/form-destination.client.view.html', '');

          // create mock Destination
          mockDestination = new DestinationsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Destination Name'
          });

          // Initialize Controller
          DestinationsController = $controller('DestinationsController as vm', {
            $scope: $scope,
            destinationResolve: mockDestination
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:destinationId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.destinationResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            destinationId: 1
          })).toEqual('/destinations/1/edit');
        }));

        it('should attach an Destination to the controller scope', function () {
          expect($scope.vm.destination._id).toBe(mockDestination._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/destinations/client/views/form-destination.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
