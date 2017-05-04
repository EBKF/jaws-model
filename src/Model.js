import { EntityClassFactory } from './Entity';
import ModelInterface from './ModelInterface';
import { entityClass } from './symbols';

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

    Reflect.defineProperty(this, entityClass, {
      value: EntityClassFactory.create(options),
    });
  }

  /**
   * Create new Entity
   * @param {{}} data
   * @return {EntityInterface}
   */
  create(data) {
    return new this[entityClass](data);
  }
}
