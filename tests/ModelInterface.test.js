import ModelInterface from '../src/ModelInterface';

/**
 * @test {ModelInterface}
 */
describe('Testing ModelInterface', () => {
  /**
   * @test {ModelInterface#constructor}
   */
  it('Throws error when instantiating interface', () => {
    expect(() => {
      const model = new ModelInterface();
      model.create();
    })
    .toThrow();
  });

  /**
   * @test {ModelInterface#create}
   */
  it('Throw error when interface is not implemented', () => {
    expect(() => {
      const Model = class extends ModelInterface {};
      const model = new Model();
      model.create();
    })
    .toThrow();
  });
});
