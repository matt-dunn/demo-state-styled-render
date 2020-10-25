/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import {Node, updateTree} from "../packages/render";

type Mount = (node: Node) => {
  getDOMNode: () => Element;
};

export const mount: Mount = (node) => {
  const el = document.createElement("div");

  updateTree(el as any, node);

  return {
    getDOMNode() {
      return el.firstElementChild as HTMLElement;
    }
  };
};

