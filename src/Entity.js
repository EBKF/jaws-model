import symbols from './symbols';

export default class Entity {
  constructor(data) {
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

Reflect.defineProperty(Entity.prototype, symbols.fields, {
  enumerable: false,
  writable: false,
  value: {},
});

Reflect.defineProperty(Entity.prototype, symbols.changed, {
  enumerable: false,
  writable: false,
  value: new Set(),
});

function createEntityClass({ schema }) {
  const EntityClass = class extends Entity {};
  const fields = EntityClass.prototype[symbols.fields];

  Object.keys(schema).forEach((name) => {
    const defaultValue = schema[name].default || null;

    Reflect.set(fields, name, {
      default: defaultValue,
      current: defaultValue,
      original: defaultValue,
    });

    Reflect.defineProperty(EntityClass.prototype, name, {
      enumerable: true,
      get() {
        return this[symbols.fields][name];
      },
      set(value) {
        this[symbols.setValue](name, value);
      },
    });
  });

  return EntityClass;
}

export const EntityClassFactory = {
  create(options) {
    return createEntityClass(options);
  },
};
