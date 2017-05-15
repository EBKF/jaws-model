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
    const Entity = class extends EntityInterface {};
    const entity = new Entity();

    expect(() => entity.$original)
      .toThrow('Not implemented');

    expect(() => entity.$changes)
      .toThrow('Not implemented');

    expect(() => entity.$fieldNames)
      .toThrow('Not implemented');

    expect(() => entity.isChanged())
      .toThrow('Not implemented');

    expect(() => entity.getOriginalFor())
      .toThrow('Not implemented');

    expect(() => entity.rollback())
      .toThrow('Not implemented');

    expect(() => entity.commit())
      .toThrow('Not implemented');
  });
});
