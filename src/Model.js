import Connectors from './connectors/Connectors';
import InstantiateError from './errors/InstantiateError';
import symbols from './symbols';

/**
 * Model class
 */
export default class BaseModel {
  /**
   * Constructor
   * @param {{}} data
   */
  constructor(data) {
    if (this.constructor === BaseModel) {
      throw new InstantiateError(BaseModel.name);
    }

    // Define fields in internal fields object
    Reflect.ownKeys(data).forEach((key) => {
      this[symbols.fields].set(key, { current: null, original: null });
    });
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
    const Model = class extends BaseModel {
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
        return this[symbols.name];
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
          computed[name] = this[symbols.fields].get(key).original;
        });

        return computed;
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
    };

    Reflect.defineProperty(Model.prototype, symbols.name, {
      value: name,
    });

    Reflect.defineProperty(Model.prototype, symbols.fields, {
      value: new Map(),
    });

    Reflect.defineProperty(Model.prototype, symbols.changes, {
      value: new Map(),
    });

    return Model;
  }
}
