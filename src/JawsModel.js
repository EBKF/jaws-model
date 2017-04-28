import symbols from './symbols';
import InstantiateAbstractError from './errors/InstantiateAbstractError';
import SchemaAlreadyLoadedError from './errors/SchemaAlreadyLoadedError';
import { isLiteral } from './utils/tests';
import Entity from './JawsEntity';



function defineClassField(target, name, fields) {
  Reflect.set(fields, name, {
    current: null,
    original: null,
    changed: false,
  });

  const field = fields[name];

  Reflect.defineProperty(target, name, {
    enumerable: true,
    get: () => field.current,
    set: (value) => {
      field.current = value;

      if (field.current === field.original) {
        target[symbols.changed].delete(field);
      } else {
        target[symbols.changed].add(field);
      }
    },
  });
}

function defineClassFields(target, schema) {
  const fields = Reflect.get(target, symbols.fields);

  Object.keys(schema).forEach((name) => {
    defineClassField(target, name, fields);
  });
}

function createEntityClass({ schema }) {
  const EntityClass = class extends Entity {};

  defineClassFields(EntityClass.prototype, schema);
  return EntityClass;
}

export default class Model {
  constructor(options) {
    // Create inner class for entities
    Reflect.defineProperty(this, symbols.class, {
      enumerable: false,
      writable: false,
      value: createEntityClass(options),
    });
  }

  create(data) {
    return new this[symbols.class](data);
  }
}
