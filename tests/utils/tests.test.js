import { isLiteral } from '../../src/utils/tests';

/**
 * @test {*}
 */
describe('Tests functions', () => {
  /**
   * @test {Function}
   */
  it('Checks if value is literal', () => {
    expect(isLiteral({}))
      .toBe(true);

    expect(isLiteral(null))
      .toBe(false);

    expect(isLiteral())
      .toBe(false);
  });
});
