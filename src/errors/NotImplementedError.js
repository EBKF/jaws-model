/**
 * Not implemented method error class
 */
export default class NotImplementedError extends Error {
  /**
   * Constructor
   * @param {string} name Method name
   */
  constructor(name) {
    super(`Not implemented interface method: ${name}`);
  }
}
