/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { AnyFunc, HTMLElementMap, Props } from "./types";
import { propertyMap } from "./utils";

export const setAttribute = (
  el: HTMLElementMap,
  name: string,
  value: string | AnyFunc
) => {
  const propertyName = propertyMap(name);

  if (typeof value === "function") {
    el[propertyName] = value;
  } else {
    if (value) {
      el.setAttribute(propertyName, value);
    } else {
      el.removeAttribute(propertyName);
    }
    el[propertyName] = value;
  }
};

export const setAttributes = (el: HTMLElement, props: Props) =>
  Object.keys(props || {}).forEach((name) =>
    setAttribute(el, name, props[name])
  );

export const removeAttribute = (el: HTMLElement, name: string) =>
  el.removeAttribute(propertyMap(name));

export const updateAttribute = (
  el: HTMLElement,
  name: string,
  value: string,
  prevValue: string
) => {
  if (value !== prevValue) {
    if (value === undefined) {
      removeAttribute(el, name);
    } else if (!prevValue || value !== prevValue) {
      setAttribute(el, name, value);
    }
  }
};

export const updateAttributes = (
  el: HTMLElement,
  props: Props,
  prevProps: Props = {}
) =>
  Object.keys({ ...props, ...prevProps }).forEach((name) =>
    updateAttribute(el, name, props[name], prevProps[name])
  );
