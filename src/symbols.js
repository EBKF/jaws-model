/**
 * @type {Symbol}
 */
const changes = Symbol('_changes');

/**
 * @type {Symbol}
 */
const entries = Symbol('_entries');

/**
 * @type {Symbol}
 */
const fields = Symbol('_fields');

/**
 * @type {Symbol}
 */
const name = Symbol('_name');

/**
 * @type {Symbol}
 */
const setField = Symbol('_setField');

/**
 * @type {Symbol}
 */
const setValue = Symbol('_setValue');

/**
 * Exports literal object with all defined symbols
 */
export default {
  changes,
  entries,
  fields,
  name,
  setField,
  setValue,
};
