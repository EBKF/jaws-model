/**
 * Instantiate error
 * @extends {Error}
 */
export default class InstantiateError extends Error {
  /**
   * Constructor
   * @param {string} name
   */
  constructor(name) {
    super(`Cannot instantiate: ${name}`);
  }
}
