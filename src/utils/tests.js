export const isLiteral = (mixed) => {
  if (mixed === null) {
    return false;
  }
  return typeof mixed === 'object' && mixed.constructor === {}.constructor;
};
