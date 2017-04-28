import Entity from '../JawsEntity';

export function isLiteral(mixed) {
  if (mixed === null) {
    return false;
  }
  return typeof mixed === 'object' && mixed.constructor === {}.constructor;
}

export function isEntity(object) {
  return object instanceof Entity;
}
