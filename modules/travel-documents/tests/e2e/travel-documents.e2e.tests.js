'use strict';

describe('Travel documents E2E Tests:', function () {
  describe('Test Travel documents page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/travel-documents');
      expect(element.all(by.repeater('travel-document in travel-documents')).count()).toEqual(0);
    });
  });
});
