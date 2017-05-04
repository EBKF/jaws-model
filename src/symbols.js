/**
 * Symbol that defines class property
 */
export const entityClass = Symbol('_entityClass');

/**
 * Symbol that defines fields property
 */
export const fields = Symbol('_fields');

/**
 * Symbol that defines setValue method
 */
export const setValue = Symbol('_setValue');

/**
 * Exports literal object with all defined symbols
 */
export default {
  entityClass,
  fields,
  setValue,
};
