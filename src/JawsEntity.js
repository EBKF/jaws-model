import symbols from './symbols';

export default class Entity {
  isChanged() {
    return Reflect.get(this, symbols.changed).size !== 0;
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
