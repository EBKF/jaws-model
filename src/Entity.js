import EntityAbstract from './EntityAbstract';
import symbols from './symbols';

/**
 * Defines field name
 * @param {Class} target Class target
 * @param {string} name Field name
 */
function defineFieldName(target, name) {
  target[symbols.fieldNames].push(name);
}
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
function createEntityClass(model, { schema }) {
  const EntityClass = class extends EntityAbstract {};
  const fields = EntityClass.prototype[symbols.fields];

  Object.keys(schema).forEach((name) => {
    defineFieldName(EntityClass.prototype, name);
    defineFieldSchema(fields, name, schema[name]);
    defineFieldAccessors(EntityClass.prototype, name);
  });

  // Set model
  Reflect.set(EntityClass.prototype, symbols.model, model);

  return EntityClass;
}

export default {
  create(model, options) {
    return createEntityClass(model, options);
  },
};
