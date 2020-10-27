/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { getDOMNodes } from "../mount";

module.exports = {
  serialize(val, config, indentation, depth, refs, printer) {
    const elements = val[getDOMNodes]();
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
    return (
      Object.getOwnPropertySymbols(val).filter((s) => s === getDOMNodes)
        .length === 1
    );
  },
};
