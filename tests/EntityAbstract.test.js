import EntityAbstract from '../src/EntityAbstract';

/**
 * @test {EntityAbstract}
 */
describe('Testing EntityAbstract', () => {
  /**
   * @test {EntityAbstract#constructor}
   */
  it('Throws error when instantiating abstract class', () => {
    expect(() => {
      const entityAbstract = new EntityAbstract();
      entityAbstract.isChanged();
    })
    .toThrow();
  });
});
