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
  simulate: <A = any>(eventName: string, eventArgs?: A) => ElementWrapper;
  at: (index: number) => ElementWrapper;
  hasClass: (className: string) => boolean;
  forEach: (
    cb: (element: HTMLElement, index: number) => void
  ) => ElementWrapper;
  map: <T>(cb: (element: HTMLElement, index: number) => T) => T[];
  length: number;
  html: () => string;
};

type Mount = (node: Node) => ElementWrapper;

const syntheticEvent = <A = any>(eventArgs?: A) => ({
  ...eventArgs,
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
          (elements, element) => [
            ...elements,
            ...Array.from<HTMLElement>(element.querySelectorAll(selector)),
          ],
          [] as HTMLElement[]
        )
      ),
    simulate(eventName, eventArgs?) {
      elements.forEach((element) => {
        const handler = element?.[`on${eventName}`];
        handler && handler(syntheticEvent(eventArgs));
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
    hasClass: (className) => {
      if (elements.length !== 1) {
        throw new TypeError(
          `hasClass can only be executed on a single element. Found ${
            elements.length
          } elements: ${elements.map((el) => el.tagName)}.`
        );
      }

      return elements[0].classList.contains(className);
    },
    forEach(cb) {
      elements.forEach(cb);

      return this;
    },
    map: (cb) => elements.map(cb),
    length: elements.length,
    html: () =>
      elements.reduce((html, element) => html + element.outerHTML.trim(), ""),
  };
};

export const mount: Mount = (node) => {
  const el = document.createElement("div");

  updateTree(el, node);

  const componentDOM = el.firstElementChild as HTMLElement | null;

  return elementWrapper(componentDOM);
};
