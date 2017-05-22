import Connectors from './connectors/Connectors';
import InstantiateError from './errors/InstantiateError';
import symbols from './symbols';

function createModel(name, BaseModel) {
  const Model = class extends BaseModel {
    constructor(data) {
      super();

      // Define fields in internal fields object
      if (data) {
        Reflect.ownKeys(data).forEach((key) => {
          this[symbols.setField](key, data[key]);
        });
      }

      // Add instance to static collection
      this.constructor[symbols.entries].add(this);
    }

    isChanged() {
      return !!this[symbols.changes].size;
    }

    rollback() {
      const changes = this[symbols.changes];

      Array.from(changes.keys()).forEach((key) => {
        const field = this[symbols.fields].get(key);
        field.current = field.default;
      });

      changes.clear();
    }

    get $name() {
      return this.constructor[symbols.name];
    }

    get $fields() {
      const computed = {};

      this[symbols.fields].forEach((value, key) => {
        computed[key] = value.current;
      });

      return computed;
    }

    get $fieldNames() {
      return Array.from(this[symbols.fields].keys());
    }

    get $changes() {
      const changes = this[symbols.changes];
      const computed = {};

      if (changes.size) {
        changes.forEach((value, key) => {
          computed[key] = value.current;
        });

        return computed;
      }

      return null;
    }

    get $original() {
      const computed = {};

      this.$fieldNames.forEach((key) => {
        computed[key] = this[symbols.fields].get(key).original;
      });

      return computed;
    }

    [symbols.setField](key, value) {
      this[symbols.fields].set(key, {
        current: value,
        original: value,
      });

      Reflect.defineProperty(this, key, {
        enumerable: true,
        get() {
          return this[symbols.fields].get(key).current;
        },
        set(newValue) {
          this[symbols.setValue](key, newValue);
        },
      });
    }

    [symbols.setValue](key, value) {
      const field = this[symbols.fields].get(key);

      if (field.current === value) {
        return;
      }

      field.current = value;

      if (field.current === field.original) {
        this[symbols.changes].delete(key);
      } else {
        this[symbols.changes].set(key, field);
      }
    }

    static get $entries() {
      return [...this[symbols.entries]];
    }
  };

  // Static fields
  Reflect.defineProperty(Model, symbols.entries, {
    value: new Set(),
  });

  Reflect.defineProperty(Model, symbols.name, {
    value: name,
  });

  // Instance fields
  Reflect.defineProperty(Model.prototype, symbols.fields, {
    value: new Map(),
  });

  Reflect.defineProperty(Model.prototype, symbols.changes, {
    value: new Map(),
  });

  return Model;
}

/**
 * BaseModel class that provides some static API
 */
export default class BaseModel {
  /**
   * Constructor
   */
  constructor() {
    if (this.constructor === BaseModel) {
      throw new InstantiateError(BaseModel.name);
    }
  }

  static get connectors() {
    return Connectors;
  }

  /**
   * Create new Model
   * @param {string} name
   * @return {Model}
   */
  static create(name) {
    return createModel(name, this);
  }
}
