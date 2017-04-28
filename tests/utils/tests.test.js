import * as tests from '../../src/utils/tests';

test('isLiteral', () => {
  const { isLiteral } = tests;

  expect(tests.isLiteral('not'))
    .toBe(false);
  
  expect(tests.isLiteral(null))
    .toBe(false);
});
