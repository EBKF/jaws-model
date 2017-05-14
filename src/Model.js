import EntityClassFactory from './Entity';
import ModelInterface from './ModelInterface';
import symbols from './symbols';

/**
 * Model class
 */
export default class Model extends ModelInterface {
  /**
   * Constructor
   * @param {{}} options
   */
  constructor(options) {
    super();

    Reflect.defineProperty(this, symbols.entityClass, {
      value: EntityClassFactory.create(this, options),
    });
  }

  /**
   * Create new Entity
   * @param {{}} data
   * @return {EntityInterface}
   */
  create(data) {
    const entity = new this[symbols.entityClass](data);
    this[symbols.entities].add(entity);

    return entity;
  }
}

Reflect.defineProperty(Model.prototype, symbols.entities, {
  value: new Set(),
});
