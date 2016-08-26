(function () {
  'use strict';

  describe('Trips Route Tests', function () {
    // Initialize global variables
    var $scope,
      TripsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _TripsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      TripsService = _TripsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('trips');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/trips');
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
          TripsController,
          mockTrip;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('trips.view');
          $templateCache.put('modules/trips/client/views/view-trip.client.view.html', '');

          // create mock Trip
          mockTrip = new TripsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Trip Name'
          });

          // Initialize Controller
          TripsController = $controller('TripsController as vm', {
            $scope: $scope,
            tripResolve: mockTrip
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:tripId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.tripResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            tripId: 1
          })).toEqual('/trips/1');
        }));

        it('should attach an Trip to the controller scope', function () {
          expect($scope.vm.trip._id).toBe(mockTrip._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/trips/client/views/view-trip.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          TripsController,
          mockTrip;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('trips.create');
          $templateCache.put('modules/trips/client/views/form-trip.client.view.html', '');

          // create mock Trip
          mockTrip = new TripsService();

          // Initialize Controller
          TripsController = $controller('TripsController as vm', {
            $scope: $scope,
            tripResolve: mockTrip
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.tripResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/trips/create');
        }));

        it('should attach an Trip to the controller scope', function () {
          expect($scope.vm.trip._id).toBe(mockTrip._id);
          expect($scope.vm.trip._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/trips/client/views/form-trip.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          TripsController,
          mockTrip;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('trips.edit');
          $templateCache.put('modules/trips/client/views/form-trip.client.view.html', '');

          // create mock Trip
          mockTrip = new TripsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Trip Name'
          });

          // Initialize Controller
          TripsController = $controller('TripsController as vm', {
            $scope: $scope,
            tripResolve: mockTrip
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:tripId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.tripResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            tripId: 1
          })).toEqual('/trips/1/edit');
        }));

        it('should attach an Trip to the controller scope', function () {
          expect($scope.vm.trip._id).toBe(mockTrip._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/trips/client/views/form-trip.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
