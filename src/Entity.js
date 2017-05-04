import EntityAbstract from './EntityAbstract';
import symbols from './symbols';

function defineFieldSchema(target, name, schema) {
  const defaultValue = schema.default || null;

  Reflect.set(target, name, {
    default: defaultValue,
    current: defaultValue,
    original: defaultValue,
  });
}

function defineFieldAccessors(target, name) {
  Reflect.defineProperty(target, name, {
    enumerable: true,
    get() {
      return this[symbols.fields][name].current;
    },
    set(value) {
      this[symbols.setValue](name, value);
    },
  });
}

/**
 * Create new entity class that extends Entity
 * and customize its fields etc.
 *
 * @param {{}} options
 */
function createEntityClass({ schema }) {
  const EntityClass = class extends EntityAbstract {};
  const fields = EntityClass.prototype[symbols.fields];

  Object.keys(schema).forEach((name) => {
    defineFieldSchema(fields, name, schema[name]);
    defineFieldAccessors(EntityClass.prototype, name);
  });

  return EntityClass;
}


export const EntityClassFactory = {
  create(options) {
    return createEntityClass(options);
  },
};
