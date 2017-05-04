/**
 * Instantiate abstract error class
 * @extends {Error}
 */
export default class InstantiateAbstractError extends Error {
  /**
   * Constructor
   * @param {string} name Class name
   */
  constructor(name) {
    super(`Cannot instantiate abstract class: ${name}`);
  }
}
