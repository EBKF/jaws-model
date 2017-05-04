/**
 * Schema already loaded error class
 */
export default class SchemaAlreadyLoadedError extends Error {
  constructor() {
    super('Schema already loaded');
  }
}
