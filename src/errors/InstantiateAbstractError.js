/**
 * Instantiate abstract class
 */
export default class InstantiateAbstractError extends Error {
  constructor(name) {
    super(`Cannot instantiate abstract class: ${name.name}`);
  }
}
