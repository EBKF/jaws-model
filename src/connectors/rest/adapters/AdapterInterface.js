import InstantiateInterfaceError from '../../../errors/InstantiateInterfaceError';
import NotImplementedError from '../../../errors/NotImplementedError';

/**
 * Interface for defining RestConnector adapters for vendor libraries
 * @interface
 */
export default class AdapterInterface {
  /**
   * Constructor
   * @throws {InstantiateInterfaceError}
   */
  constructor() {
    if (this.constructor === AdapterInterface) {
      throw new InstantiateInterfaceError(AdapterInterface.name);
    }
  }
}
