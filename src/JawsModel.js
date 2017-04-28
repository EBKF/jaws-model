import { isLiteral } from './utils/tests';
import InstantiateAbstractError from './errors/InstantiateAbstractError';
import SchemaAlreadyLoadedError from './errors/SchemaAlreadyLoadedError';

const symbols = {
  class: Symbol('class'),
  createClass: Symbol('_createClass'),
  isChanged: Symbol('isChanged'),
  fields: Symbol('_fields'),
  schemaLoaded: Symbol('_schemaLoaded'),
  loadSchema: Symbol('_loadSchema'),
};

function createClass(target) {
  Reflect.defineProperty(target, symbols.class, {
    enumerable: false,
    writable: false,
    value: class {
    },
  });

  return Reflect.get(target, symbols.class);
}

function createFields(target) {
  Reflect.defineProperty(target, symbols.fields, {
    enumerable: false,
    writable: false,
    value: {},
  });

  return Reflect.get(target, symbols.fields);
}

function getFields(target) {
  return Reflect.get(target, symbols.fields);
}

function createField(target, name, options) {
  const fields = getFields(target);

  Reflect.set(fields, name, {
    value: null,
  });

  Reflect.defineProperty(target, name, {
    enumerable: true,
    get: () => {
      return fields[name].value;
    },
    set: (value) => {
      if (fields[name].value !== value) {
        fields[name].value = value;
      }
    }
  })
}

export function isEntity(object) {
  return isLiteral(Reflect.get(object, symbols.fields));
}
export default class Model {
  constructor(options) {
    // Create inner class for entities
    Reflect.defineProperty(this, symbols.class, {
      value: Model.createClass(options),
    });
  }

  static createClass(options) {
    const _class = createClass(this);
    const fields = createFields(_class.prototype);

    // Get only public keys
    Object.keys(options.schema).forEach((key) => {
      createField(_class.prototype, key);
    });

    return _class;
  }

  create(data) {
    return new this[symbols.class](data);
  }
}
