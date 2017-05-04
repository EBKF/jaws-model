/**
 * Checks if value is literal object
 * @param {*} mixed value
 */
export function isLiteral(mixed) {
  if (mixed === null) {
    return false;
  }
  return typeof mixed === 'object' && mixed.constructor === {}.constructor;
}

/**
 * Exports object literal with all tests as default
 */
export default {
  isLiteral,
};
