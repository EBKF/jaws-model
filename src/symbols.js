/**
 * Sets entityClass property
 */
const entityClass = Symbol('_entityClass');

/**
 * Set entities property
 */
const entities = Symbol('_entities');

/**
 * Sets field property
 */
const fields = Symbol('_fields');

/**
 * Sets field names property
 */
const fieldNames = Symbol('_fieldNames');

/**
 * Sets setValue method
 */
const setValue = Symbol('_setValue');

/**
 * Exports literal object with all defined symbols
 */
export default {
  entityClass,
  entities,
  fields,
  fieldNames,
  setValue,
};
