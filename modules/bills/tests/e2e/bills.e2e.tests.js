'use strict';

describe('Bills E2E Tests:', function () {
  describe('Test Bills page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/bills');
      expect(element.all(by.repeater('bill in bills')).count()).toEqual(0);
    });
  });
});
