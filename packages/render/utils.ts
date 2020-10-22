/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import {Node} from "./types";

type MappedProps = {
  [key: string]: string;
}

const mappedProps: MappedProps = {
  "className": "class",
  "htmlFor": "for",
};

export const propertyMap = (name: string) => {
  if (mappedProps[name]) {
    return mappedProps[name];
  } else if (/^on/.test(name)) {
    return name.toLowerCase();
  }

  return name;
};

export const isNode = (node: any): node is Node => typeof node?.type === "string" && Object.prototype.hasOwnProperty.call(node, "props");

export const classnames = (...classNames: (string | undefined)[]): string => classNames.join(" ");

