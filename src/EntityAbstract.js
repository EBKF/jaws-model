import symbols from './symbols';
import EntityInterface from './EntityInterface';
import InstantiateAbstractError from './errors/InstantiateAbstractError';

/**
 * Abstract Entity class
 * @implements {EntityInterface}
 */
export default class EntityAbstract extends EntityInterface {
  constructor(data = {}) {
    super();

    if (this.constructor === EntityAbstract) {
      throw new InstantiateAbstractError(EntityAbstract.name);
    }

    Reflect.ownKeys(data).forEach((key) => {
      const field = this[symbols.fields][key];

      if (field) {
        field.original = data[key];
        field.current = field.original;
      }
    });
  }

  isChanged() {
    return !!this[symbols.changed].size;
  }

  [symbols.setValue](name, value) {
    const field = this[symbols.fields][name];

    if (field.current !== value) {
      field.current = value;

      if (field.current === field.original) {
        this[symbols.changed].delete(field);
      } else {
        this[symbols.changed].add(field);
      }
    }
  }
}

Reflect.defineProperty(EntityAbstract.prototype, symbols.fields, {
  value: {},
});

Reflect.defineProperty(EntityAbstract.prototype, symbols.changed, {
  value: new Set(),
});
