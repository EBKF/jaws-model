/**
 * Changes property
 */
const changes = Symbol('_changes');

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
 * name property
 */
const name = Symbol('_name');

/**
 * setValue method
 */
const setValue = Symbol('_setValue');

/**
 * Exports literal object with all defined symbols
 */
export default {
  changes,
  entityClass,
  entities,
  fields,
  model,
  name,
  setValue,
};
