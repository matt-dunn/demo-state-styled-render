/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { AnyFunc, HTMLElementMap, Props } from "./types";
import { isValidElementAttribute, propertyMap } from "./utils";

export const setAttribute = (
  element: HTMLElementMap,
  name: string,
  value: string | AnyFunc
) => {
  const propertyName = propertyMap(name);

  if (propertyName === "style") {
    if (typeof value !== "object") {
      throw new TypeError("Invalid style object");
    }

    Object.entries(value).forEach(
      ([key, value]) => ((<any>element.style)[key] = value)
    );
  } else if (typeof value === "function") {
    element[propertyName] = value;
  } else if (isValidElementAttribute(element, propertyName)) {
    if (value) {
      element.setAttribute(propertyName, value);
    } else {
      element.removeAttribute(propertyName);
    }
    element[propertyName] = value;
  }
};

export const setAttributes = (element: HTMLElement, props: Props) =>
  Object.keys(props || {})
    .filter((name) => isValidElementAttribute(element, name))
    .forEach((name) => setAttribute(element, name, props[name]));

export const removeAttribute = (element: HTMLElement, name: string) =>
  element.removeAttribute(propertyMap(name));

export const updateAttribute = (
  element: HTMLElement,
  name: string,
  value: string,
  prevValue: string
) => {
  if (value !== prevValue) {
    if (value === undefined) {
      removeAttribute(element, name);
    } else if (!prevValue || value !== prevValue) {
      setAttribute(element, name, value);
    }
  }
};

export const updateAttributes = (
  element: HTMLElement,
  props: Props,
  prevProps: Props = {}
) =>
  Object.keys({ ...props, ...prevProps }).forEach((name) =>
    updateAttribute(element, name, props[name], prevProps[name])
  );
