/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { HTMLElementMap, Node } from "../types";
import { updateTree } from "../element";

export const getDOMNodes = Symbol("getDOMNodes");

type ElementWrapper = {
  [getDOMNodes]: () => HTMLElement[];
  find: (selector: string) => ElementWrapper;
  simulate: (eventName: string) => ElementWrapper;
  at: (index: number) => ElementWrapper;
};

type Mount = (node: Node) => ElementWrapper;

const syntheticEvent = () => ({
  preventDefault: () => undefined,
  stopPropagation: () => undefined,
});

const elementWrapper = (
  element?: HTMLElementMap[] | HTMLElementMap | null
): ElementWrapper => {
  const elements =
    (element && Array.isArray(element) ? element : [element as HTMLElement]) ||
    [];

  return {
    [getDOMNodes]: () => elements,
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
      elements.forEach((element) => {
        const handler = element?.[`on${eventName}`];
        handler && handler(syntheticEvent());
      });

      return this;
    },
    at(index) {
      if ((Array.isArray(element) && !element[index]) || index !== 0) {
        throw new TypeError(`No element found at [${index}]`);
      }

      if (Array.isArray(element)) {
        return elementWrapper(element[index]);
      }

      return this;
    },
  };
};

export const mount: Mount = (node) => {
  const el = document.createElement("div");

  updateTree(el, node);

  const componentDOM = el.firstElementChild as HTMLElement | null;

  return elementWrapper(componentDOM);
};
