/**
 * Undefined field error class
 */
export default class UndefinedFieldError extends Error {
  /**
   * Constructor
   * @param {string} name Field name
   */
  constructor(name) {
    super(`Undefined field: ${name}`);
  }
}
