import symbols from './symbols';
import EntityInterface from './EntityInterface';
import InstantiateAbstractError from './errors/InstantiateAbstractError';
import UndefinedFieldError from './errors/UndefinedFieldError';

/**
 * Abstract Entity class
 * @implements {EntityInterface}
 */
export default class EntityAbstract extends EntityInterface {
  /**
   * Constructor
   * @param {{}} data
   */
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

  /**
   * Is Entity changed
   * @return {boolean}
   */
  isChanged() {
    return !!this[symbols.changed].size;
  }

  /**
   * Set value of given field
   * @param {string} name Field name
   * @param {*} value Value
   */
  [symbols.setValue](name, value) {
    const field = this[symbols.fields][name];

    if (field.current !== value) {
      field.current = value;

      if (field.current === field.original) {
        this[symbols.changed].delete(name);
      } else {
        this[symbols.changed].set(name, field);
      }
    }
  }

  /**
   * Get original value for field
   * @param {string} name Field name
   * @returns {*}
   */
  getOriginalFor(name) {
    if (Reflect.has(this[symbols.fields], name)) {
      return this[symbols.fields][name].original;
    }

    throw new UndefinedFieldError(name);
  }

  /**
   * Get object with fields original values
   * @returns {{}}
   */
  get $original() {
    const original = {};
    const fields = this[symbols.fields];

    Reflect.ownKeys(fields).forEach((name) => {
      original[name] = fields[name].original;
    });

    return original;
  }

  /**
   * Revert entity to its original condition
   */
  rollback() {
    const changed = this[symbols.changed];
    const fields = this[symbols.fields];

    Array.from(changed.keys()).forEach((name) => {
      fields[name].current = fields[name].default;
    });

    changed.clear();
  }

  get $fieldNames() {
    return this[symbols.fieldNames];
  }

  /**
   * Get object with changed fields
   * @returns {{}}
   */
  get $changes() {
    const changed = this[symbols.changed];
    const changes = {};

    if (changed.size) {
      changed.forEach((value, key) => {
        changes[key] = value.current;
      });

      return changes;
    }

    return null;
  }
}

Reflect.defineProperty(EntityAbstract.prototype, symbols.fields, {
  value: {},
});

Reflect.defineProperty(EntityAbstract.prototype, symbols.fieldNames, {
  value: [],
});

Reflect.defineProperty(EntityAbstract.prototype, symbols.changed, {
  value: new Map(),
});

