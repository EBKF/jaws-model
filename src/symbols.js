/**
 * entityClass property
 */
const entityClass = Symbol('_entityClass');

/**
 * entities property
 */
const entities = Symbol('_entities');

/**
 * field property
 */
const fields = Symbol('_fields');

/**
 * model property
 */
const model = Symbol('_model');

/**
 * field names property
 */
const fieldNames = Symbol('_fieldNames');

/**
 * setValue method
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
  model,
  setValue,
};
