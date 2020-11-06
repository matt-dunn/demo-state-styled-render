/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { Node } from "packages/render";

import { looseRef } from "./utils";

export const getValueSymbol = Symbol("getValueSymbol");

export type Context<T = any> = {
  [getValueSymbol]: () => T | undefined;
  Provider: ({ value, children }: { value: T; children: Node }) => Node;
};

export const createContext = <T = any>(defaultValue?: T): Context<T> => {
  const currentValue = looseRef(defaultValue);

  return {
    [getValueSymbol]: () => currentValue.current,
    Provider: ({ value, children }) => {
      if (currentValue.current !== value) {
        currentValue.current = value;
      }

      return children;
    },
  };
};
