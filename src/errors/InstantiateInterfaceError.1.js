/**
 * Instantiate interface error class
 * @extends {Error}
 */
export default class InstantiateAbstractError extends Error {
  /**
   * Constructor
   * @param {string} name Class name
   */
  constructor(name) {
    super(`Cannot instantiate interface: ${name}`);
  }
}
