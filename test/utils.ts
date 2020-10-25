/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import {Node, updateTree} from "packages/render";

type ElementWrapper = {
  simulate: (eventName: string) => any;
}

type Wrapper = {
  find: (selector: string) => ElementWrapper;
}

type Mount = (node: Node) => {
  getDOMNode: () => Element | null;
  getNode: () => Node;
} & Wrapper;

export interface ElementMap extends Element{
  [key: string]: any
}

const simulatedEvent = () => ({
  preventDefault: () => undefined,
  stopPropagation: () => undefined
});

const elementWrapper = (el: ElementMap | null | undefined): ElementWrapper => ({
  simulate: eventName => {
    const handler = el?.[`on${eventName}`];
    return handler && handler(simulatedEvent());
  }
});

export const mount: Mount = (node) => {
  const el = document.createElement("div");

  updateTree(el, node);

  const componentDOM = el.firstElementChild;

  return {
    getDOMNode() {
      return componentDOM;
    },
    getNode: () => node,
    find: (selector) => elementWrapper(componentDOM?.querySelector(selector))
  };
};
