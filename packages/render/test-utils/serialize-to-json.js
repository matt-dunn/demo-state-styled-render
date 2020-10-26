/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

module.exports = {
  serialize(val, config, indentation, depth, refs, printer) {
    const elements = val.getDOMNodes();
    return printer(
      elements.length === 1 ? elements[0] : elements,
      config,
      indentation,
      depth,
      refs,
      printer
    );
  },

  test(val) {
    return Object.prototype.hasOwnProperty.call(val, "getDOMNodes");
  },
};
