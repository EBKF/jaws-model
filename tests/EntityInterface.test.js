import EntityInterface from '../src/EntityInterface';

/**
 * @test {EntityInterface}
 */
describe('Testing EntityInterface', () => {
  /**
   * @test {EntityInterface#constructor}
   */
  it('Throws error when instantiating interface', () => {
    expect(() => {
      const entityInterface = new EntityInterface();
      entityInterface.isChanged();
    })
    .toThrow();
  });

  /**
   * @test {EntityInterface#isChanged}
   */
  it('Throw error when interface is not implemented', () => {
    expect(() => {
      const Entity = class extends EntityInterface {};
      const entity = new Entity();
      entity.isChanged();
    })
    .toThrow();
  });
});
