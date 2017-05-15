import InstantiateInterfaceError from './errors/InstantiateInterfaceError';
import NotImplementedError from './errors/NotImplementedError';

/**
 * Interface for defining Models
 * @interface
 */
export default class ModelInterface {
  /**
   * Constructor
   * @throws {InstantiateInterfaceError}
   */
  constructor() {
    if (this.constructor === ModelInterface) {
      throw new InstantiateInterfaceError(ModelInterface.name);
    }
  }

  /**
   * Creates new Entity
   * @throws {NotImplementedError}
   * @return {EntityInterface}
   */
  create() {
    throw new NotImplementedError();
  }
}
