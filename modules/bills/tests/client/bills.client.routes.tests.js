(function () {
  'use strict';

  describe('Bills Route Tests', function () {
    // Initialize global variables
    var $scope,
      BillsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _BillsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      BillsService = _BillsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('bills');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/bills');
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
          BillsController,
          mockBill;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('bills.view');
          $templateCache.put('modules/bills/client/views/view-bill.client.view.html', '');

          // create mock Bill
          mockBill = new BillsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Bill Name'
          });

          // Initialize Controller
          BillsController = $controller('BillsController as vm', {
            $scope: $scope,
            billResolve: mockBill
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:billId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.billResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            billId: 1
          })).toEqual('/bills/1');
        }));

        it('should attach an Bill to the controller scope', function () {
          expect($scope.vm.bill._id).toBe(mockBill._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/bills/client/views/view-bill.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          BillsController,
          mockBill;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('bills.create');
          $templateCache.put('modules/bills/client/views/form-bill.client.view.html', '');

          // create mock Bill
          mockBill = new BillsService();

          // Initialize Controller
          BillsController = $controller('BillsController as vm', {
            $scope: $scope,
            billResolve: mockBill
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.billResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/bills/create');
        }));

        it('should attach an Bill to the controller scope', function () {
          expect($scope.vm.bill._id).toBe(mockBill._id);
          expect($scope.vm.bill._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/bills/client/views/form-bill.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          BillsController,
          mockBill;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('bills.edit');
          $templateCache.put('modules/bills/client/views/form-bill.client.view.html', '');

          // create mock Bill
          mockBill = new BillsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Bill Name'
          });

          // Initialize Controller
          BillsController = $controller('BillsController as vm', {
            $scope: $scope,
            billResolve: mockBill
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:billId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.billResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            billId: 1
          })).toEqual('/bills/1/edit');
        }));

        it('should attach an Bill to the controller scope', function () {
          expect($scope.vm.bill._id).toBe(mockBill._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/bills/client/views/form-bill.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
