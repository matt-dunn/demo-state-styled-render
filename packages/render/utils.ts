/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { AnyDOMElement, AnyNode, DOMElement, FC, Node } from "./types";

const NAMESPACE_URI_SGV = "http://www.w3.org/2000/svg";

type MappedProps = {
  [key: string]: string;
};

const mappedProps: MappedProps = {
  className: "class",
  htmlFor: "for",
};

export const propertyMap = (name: string) => {
  if (mappedProps[name]) {
    return mappedProps[name];
  } else if (/^on/.test(name)) {
    return name.toLowerCase();
  }

  return name;
};

export const isNode = (node?: AnyNode): node is Node =>
  (node &&
    typeof node === "object" &&
    Object.prototype.hasOwnProperty.call(node, "type")) ||
  false;

export const isSVGNode = (node?: AnyNode) =>
  isNode(node) && node.type === "svg";

export const classnames = (...classNames: string[]): string =>
  classNames.join(" ");

export type LooseRef<T = any> = {
  current: T;
};

export const looseRef = <T>(initial: T): LooseRef<T> => ({
  current: initial,
});

export type Deps = any[];

export const hasChanged = <T extends Deps = Deps>(deps: T, prevDeps?: T) =>
  !prevDeps || deps.filter((d, i) => d !== prevDeps[i]).length > 0;

const ATTR_WHITELIST = [/class/, /data-*/, /aria-*/];

export const isValidElementAttribute = (element: DOMElement, name: string) =>
  !isHTMLElement(element) ||
  name in element ||
  ATTR_WHITELIST.find((pattern) => pattern.test(name)) !== undefined;

export const getComponentName = (Component: FC | string | unknown) => {
  if (typeof Component === "function") {
    return Component.name;
  } else if (typeof Component === "string") {
    return Component;
  }

  return "anonymous";
};

export const isHTMLElement = (element: AnyDOMElement): element is HTMLElement =>
  element.namespaceURI !== NAMESPACE_URI_SGV;

export const getElementNamespaceURI = (node: AnyNode) => {
  if (isSVGNode(node)) {
    return NAMESPACE_URI_SGV;
  }

  return null;
};
