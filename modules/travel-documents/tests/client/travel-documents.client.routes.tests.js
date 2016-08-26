(function () {
  'use strict';

  describe('Travel documents Route Tests', function () {
    // Initialize global variables
    var $scope,
      TravelDocumentsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _TravelDocumentsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      TravelDocumentsService = _TravelDocumentsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('travel-documents');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/travel-documents');
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
          TravelDocumentsController,
          mockTravelDocument;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('travel-documents.view');
          $templateCache.put('modules/travel-documents/client/views/view-travel-document.client.view.html', '');

          // create mock Travel document
          mockTravelDocument = new TravelDocumentsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Travel document Name'
          });

          // Initialize Controller
          TravelDocumentsController = $controller('TravelDocumentsController as vm', {
            $scope: $scope,
            travelDocumentResolve: mockTravelDocument
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:travelDocumentId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.travelDocumentResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            travelDocumentId: 1
          })).toEqual('/travel-documents/1');
        }));

        it('should attach an Travel document to the controller scope', function () {
          expect($scope.vm.travelDocument._id).toBe(mockTravelDocument._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/travel-documents/client/views/view-travel-document.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          TravelDocumentsController,
          mockTravelDocument;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('travel-documents.create');
          $templateCache.put('modules/travel-documents/client/views/form-travel-document.client.view.html', '');

          // create mock Travel document
          mockTravelDocument = new TravelDocumentsService();

          // Initialize Controller
          TravelDocumentsController = $controller('TravelDocumentsController as vm', {
            $scope: $scope,
            travelDocumentResolve: mockTravelDocument
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.travelDocumentResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/travel-documents/create');
        }));

        it('should attach an Travel document to the controller scope', function () {
          expect($scope.vm.travelDocument._id).toBe(mockTravelDocument._id);
          expect($scope.vm.travelDocument._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/travel-documents/client/views/form-travel-document.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          TravelDocumentsController,
          mockTravelDocument;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('travel-documents.edit');
          $templateCache.put('modules/travel-documents/client/views/form-travel-document.client.view.html', '');

          // create mock Travel document
          mockTravelDocument = new TravelDocumentsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Travel document Name'
          });

          // Initialize Controller
          TravelDocumentsController = $controller('TravelDocumentsController as vm', {
            $scope: $scope,
            travelDocumentResolve: mockTravelDocument
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:travelDocumentId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.travelDocumentResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            travelDocumentId: 1
          })).toEqual('/travel-documents/1/edit');
        }));

        it('should attach an Travel document to the controller scope', function () {
          expect($scope.vm.travelDocument._id).toBe(mockTravelDocument._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/travel-documents/client/views/form-travelDocument.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
