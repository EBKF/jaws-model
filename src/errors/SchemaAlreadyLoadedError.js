/**
 * Schema already loaded error
 */
export default class SchemaAlreadyLoadedError extends Error {
  constructor() {
    super('Schema already loaded');
  }
}
