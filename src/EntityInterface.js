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
    throw new NotImplementedError(this.isChanged.name);
  }

  /**
   * Get original value for given field
   */
  getOriginalFor() {
    throw new NotImplementedError(this.getOriginalFor.name);
  }

  /**
   * Get original values of all fields
   */
  get $original() {
    throw new NotImplementedError(this.$original.name);
  }

  /**
   * Get Entity changed fields with current values
   */
  get $changes() {
    throw new NotImplementedError(this.$changes.name);
  }

  /**
   * Get all field names
   */
  get $fieldNames() {
    throw new NotImplementedError(this.$fieldNames.name);
  }

  rollback() {
    throw new NotImplementedError(this.rollback.name);
  }

  commit() {
    throw new NotImplementedError(this.$commit.name);
  }
}
