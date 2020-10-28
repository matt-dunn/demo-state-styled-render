/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { getDOMNodes } from "../mount";

module.exports = {
  serialize(value, config, indentation, depth, refs, printer) {
    const elements = value[getDOMNodes]();

    return printer(
      elements.length === 1 ? elements[0] : elements,
      config,
      indentation,
      depth,
      refs,
      printer
    );
  },

  test(value) {
    return (
      Object.getOwnPropertySymbols(value).filter(
        (symbol) => symbol === getDOMNodes
      ).length === 1
    );
  },
};
