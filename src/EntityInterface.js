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
   * @throws {NotImplementedError}
   * @return {boolean}
   */
  isChanged() {
    throw new NotImplementedError(this.isChanged.name);
  }

  getOriginalFor() {
    throw new NotImplementedError(this.isChanged.name);
  }

  get $original() {
    throw new NotImplementedError(this.$original.name);
  }

  get $changes() {
    throw new NotImplementedError(this.$changes.name);
  }

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
