import Model from '../src/Model';
import ModelInterface from '../src/ModelInterface';
import { entityClass } from '../src/symbols';

/**
 * @test {Model}
 */
describe('Model functionality', () => {
  let model = null;

  /**
   * @test {Model}
   */
  it('Creates new Model', () => {
    model = new Model({
      schema: {},
    });

    expect(typeof model)
      .toBe('object');
  });

  /**
   * @test {Model}
   */
  it('Checks if Model is instance of ModelInterface', () => {
    expect(model)
      .toBeInstanceOf(ModelInterface);
  });

  /**
   * @test {Model#create}
   */
  it('Creates new entity via Model', () => {
    expect(model.create())
      .toBeInstanceOf(model[entityClass]);
  });
});
