'use strict';

describe('Trips E2E Tests:', function () {
  describe('Test Trips page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/trips');
      expect(element.all(by.repeater('trip in trips')).count()).toEqual(0);
    });
  });
});
