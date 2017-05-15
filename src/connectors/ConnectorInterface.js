import InstantiateInterfaceError from '../errors/InstantiateInterfaceError';
import NotImplementedError from '../errors/NotImplementedError';

/**
 * Interface for defining Connectors
 * @interface
 */
export default class ConnectorInterface {
  /**
   * Constructor
   * @throws {InstantiateInterfaceError}
   */
  constructor() {
    if (this.constructor === ConnectorInterface) {
      throw new InstantiateInterfaceError(ConnectorInterface.name);
    }
  }
}
