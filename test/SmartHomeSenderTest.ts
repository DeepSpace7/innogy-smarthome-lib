const expect = require('chai').expect;

class Calculator {
  add(x: number, y: number): number {
    return x + y;
  }
}

describe('Calculator', () => {
  var subject: Calculator;

  beforeEach(() => {
    subject = new Calculator();
  });

  describe('#add', () => {
    it('should add two numbers together', () => {
      const result = subject.add(2, 3);
      expect(result).to.be.equal(5);
    });
  });
});