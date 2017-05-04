/**
 * Instantiate interface error class
 * @extends {Error}
 */
export default class InstantiateInterfaceError extends Error {
  /**
   * Constructor
   * @param {string} name Class name
   */
  constructor(name) {
    super(`Cannot instantiate interface: ${name}`);
  }
}
