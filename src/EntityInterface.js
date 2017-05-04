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
}
