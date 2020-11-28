/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { HTMLElementMap, Node } from "../types";
import { looseRef } from "../utils";
import { MxFactory } from "../render";

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
  update: () => void;
};

type Mount = (node: Node) => ElementWrapper;

const syntheticEvent = <A = any>(eventArgs?: A) => ({
  ...eventArgs,
  preventDefault: () => undefined,
  stopPropagation: () => undefined,
});

type ElementWrapperOptions = {
  render: () => void;
};

const elementWrapper = (
  parentElement: HTMLElementMap,
  element: HTMLElementMap | HTMLElementMap[],
  options: ElementWrapperOptions
): ElementWrapper => {
  const elements = looseRef(Array.isArray(element) ? element : [element] || []);

  return {
    [getDOMNodes]: () => elements.current,
    find(selector) {
      return elementWrapper(
        parentElement,
        elements.current.reduce(
          (elements, element) => [
            ...elements,
            ...Array.from<HTMLElement>(element.querySelectorAll(selector)),
          ],
          [] as HTMLElement[]
        ),
        options
      );
    },
    simulate(eventName, eventArgs?) {
      elements.current.forEach((element) => {
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
        return elementWrapper(parentElement, element[index], options);
      }

      return this;
    },
    hasClass(className) {
      if (elements.current.length !== 1) {
        throw new TypeError(
          `hasClass can only be executed on a single element. Found ${
            elements.current.length
          } elements: ${elements.current.map((el) => el.tagName)}.`
        );
      }

      return elements.current[0].classList.contains(className);
    },
    forEach(cb) {
      elements.current.forEach(cb);

      return this;
    },
    map: (cb) => elements.current.map(cb),
    length: elements.current.length,
    html() {
      return elements.current.reduce(
        (html, element) => html + element.outerHTML.trim(),
        ""
      );
    },
    update() {
      options.render();
      elements.current = Array.isArray(parentElement.firstElementChild)
        ? parentElement.firstElementChild
        : [parentElement.firstElementChild as HTMLElement] || [];

      return this;
    },
  };
};

export const mount: Mount = (node) => {
  const el = document.createElement("div");

  const mx = MxFactory();

  const render = mx.render(node)(el);

  render();

  return elementWrapper(el, el.firstElementChild as HTMLElement, { render });
};
