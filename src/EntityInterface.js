import InstantiateInterfaceError from './errors/InstantiateInterfaceError';
import NotImplementedError from './errors/NotImplementedError';

/**
 * Interface for defining Entities
 * @interface
 */
export default class EntityInterface {
  /**
   * Constructor
   * @throws {InstantiateInterfaceError}
   */
  constructor() {
    if (this.constructor === EntityInterface) {
      throw new InstantiateInterfaceError(EntityInterface.name);
    }
  }

  /**
   * Is Entity changed
   */
  isChanged() {
    throw new NotImplementedError();
  }

  /**
   * Get original value for given field
   */
  getOriginalFor() {
    throw new NotImplementedError();
  }

  /**
   * Get original values of all fields
   */
  get $original() {
    throw new NotImplementedError();
  }

  /**
   * Get Entity changed fields with current values
   */
  get $changes() {
    throw new NotImplementedError();
  }

  /**
   * Get all field names
   */
  get $fieldNames() {
    throw new NotImplementedError();
  }

  rollback() {
    throw new NotImplementedError();
  }

  commit() {
    throw new NotImplementedError();
  }
}
