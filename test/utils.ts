/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import {Node, updateTree} from "packages/render";

type Mount = (node: Node) => {
  getDOMNode: () => Element | null;
  getNode: () => Node;
};

export const mount: Mount = (node) => {
  const el = document.createElement("div");

  updateTree(el, node);

  return {
    getDOMNode() {
      return el.firstElementChild;
    },
    getNode: () => node
  };
};
