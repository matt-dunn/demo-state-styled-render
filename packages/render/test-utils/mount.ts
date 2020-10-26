/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { HTMLElementMap, Node } from "../types";
import { updateTree } from "../element";

type ElementWrapper = {
  getDOMNodes: () => HTMLElement[];
  find: (selector: string) => ElementWrapper;
  simulate: (eventName: string) => ElementWrapper;
};

type Mount = (node: Node) => ElementWrapper;

const syntheticEvent = () => ({
  preventDefault: () => undefined,
  stopPropagation: () => undefined,
});

const elementWrapper = (elements: HTMLElementMap[]): ElementWrapper => ({
  getDOMNodes: () => elements,
  find: (selector) =>
    elementWrapper(
      elements.reduce(
        (els, el) => [
          ...els,
          ...Array.from<HTMLElement>(el.querySelectorAll(selector)),
        ],
        [] as HTMLElement[]
      )
    ),
  simulate(eventName) {
    elements?.forEach((element) => {
      const handler = element?.[`on${eventName}`];
      handler && handler(syntheticEvent());
    });

    return this;
  },
});

export const mount: Mount = (node) => {
  const el = document.createElement("div");

  updateTree(el, node);

  const componentDOM = el.firstElementChild as HTMLElement | null;

  return elementWrapper((componentDOM && [componentDOM]) || []);
};
