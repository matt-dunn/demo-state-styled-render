/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { Node } from "./types";

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

export const isNode = (node: any): node is Node =>
  (node &&
    typeof node === "object" &&
    Object.prototype.hasOwnProperty.call(node, "type")) ||
  false;

export const classnames = (...classNames: (string | undefined)[]): string =>
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

export const isValidElementAttribute = (element: HTMLElement, name: string) =>
  ATTR_WHITELIST.find((pattern) => pattern.test(name)) !== undefined ||
  name in element;
