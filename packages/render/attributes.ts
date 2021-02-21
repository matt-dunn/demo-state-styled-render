/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { AnyFunc, DOMElement, Props } from "./types";
import { isHTMLElement, isValidElementAttribute, propertyMap } from "./utils";

export const setAttribute = (
  element: DOMElement,
  name: string,
  value: string | number | boolean | AnyFunc
) => {
  const propertyName = propertyMap(name);

  if (propertyName === "style") {
    if (typeof value !== "object") {
      throw new TypeError("Invalid style object");
    }

    Object.entries(value).forEach(
      ([key, value]) => ((<any>element.style)[key] = value)
    );
  } else if (isHTMLElement(element) && typeof value === "function") {
    element[propertyName] = value;
  } else if (isValidElementAttribute(element, propertyName)) {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      if (value) {
        element.setAttributeNS(null, propertyName, value.toString());
      } else {
        element.removeAttributeNS(null, propertyName);
      }
    }

    if (isHTMLElement(element)) {
      element[propertyName] = value;
    }
  }
};

export const setAttributes = (element: DOMElement, props: Props) =>
  Object.keys(props || {})
    .filter((name) => isValidElementAttribute(element, name))
    .forEach((name) => setAttribute(element, name, props[name]));

export const removeAttribute = (element: DOMElement, name: string) =>
  element.removeAttribute(propertyMap(name));

export const updateAttribute = (
  element: DOMElement,
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
  element: DOMElement,
  props: Props,
  prevProps: Props = {}
) =>
  Object.keys({ ...props, ...prevProps }).forEach((name) =>
    updateAttribute(element, name, props[name], prevProps[name])
  );
