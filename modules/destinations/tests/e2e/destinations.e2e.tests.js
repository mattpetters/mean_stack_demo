'use strict';

describe('Destinations E2E Tests:', function () {
  describe('Test Destinations page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/destinations');
      expect(element.all(by.repeater('destination in destinations')).count()).toEqual(0);
    });
  });
});
