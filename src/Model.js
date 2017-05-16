import Connectors from './connectors/Connectors';
import symbols from './symbols';

/**
 * Model class
 */
export default class Model {
  /**
   * Constructor
   * @param {{}} data
   */
  constructor(data) {
    Reflect.ownKeys(data).forEach((key) => {
      if (this[symbols.fields].has(key)) {
        const field = this[symbols.fields].get(key);
        field.original = data[key];
        field.current = field.original;
      }
    });
  }

  static get connectors() {
    return Connectors;
  }
  static extend(definition) {
    const schema = definition.schema;
    const fields = new Map();

    const ModelClass = class extends Model {
      isChanged() {
        return !!this[symbols.changes].size;
      }

      rollback() {
        const changes = this[symbols.changes];

        Array.from(changes.keys()).forEach((name) => {
          const field = this[symbols.fields].get(name);
          field.current = field.default;
        });

        changes.clear();
      }

      get $name() {
        return ModelClass[symbols.name];
      }

      get $fields() {
        const computed = {};

        this[symbols.fields].forEach((value, key) => {
          computed[key] = value.current;
        });

        return computed;
      }

      get $fieldNames() {
        return [...this[symbols.fields].keys()];
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

        this.$fieldNames.forEach((name) => {
          computed[name] = this[symbols.fields].get(name).original;
        });

        return computed;
      }

      [symbols.setValue](name, value) {
        const field = this[symbols.fields].get(name);

        if (field.current !== value) {
          field.current = value;

          if (field.current === field.original) {
            this[symbols.changes].delete(name);
          } else {
            this[symbols.changes].set(name, field);
          }
        }
      }
    };

    ModelClass[symbols.name] = definition.name;
    ModelClass[symbols.fields] = {};
    ModelClass[symbols.fieldNames] = new Set();

    Reflect.defineProperty(ModelClass.prototype, symbols.fields, {
      value: fields,
    });

    Reflect.ownKeys(schema).forEach((name) => {
      const defaultValue = schema[name].default || null;

      fields.set(name, {
        default: defaultValue,
        current: defaultValue,
        origin: defaultValue,
      });

      Reflect.defineProperty(ModelClass.prototype, name, {
        enumerable: true,
        get() {
          return this[symbols.fields].get(name).current;
        },
        set(value) {
          this[symbols.setValue](name, value);
        },
      });
    });

    Reflect.defineProperty(ModelClass.prototype, symbols.changes, {
      value: new Map(),
    });

    return ModelClass;
  }
}
