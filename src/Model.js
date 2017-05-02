import symbols from './symbols';
import InstantiateAbstractError from './errors/InstantiateAbstractError';
import SchemaAlreadyLoadedError from './errors/SchemaAlreadyLoadedError';
import { EntityClassFactory } from './Entity';

export default class Model {
  constructor(options) {
    // Create class for entities
    Reflect.defineProperty(this, symbols.class, {
      enumerable: false,
      writable: false,
      value: EntityClassFactory.create(options),
    });
  }

  create(data) {
    return new this[symbols.class](data);
  }
}
