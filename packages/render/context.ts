/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { Node } from "./types";
import { useContextState } from "./hooks/useContextState";

export const getValueSymbol = Symbol("getValueSymbol");

export type Context<T = any> = {
  Provider: ({ value, children }: { value: T; children: Node }) => Node;
};

export const createContext = <T = any>(defaultValue?: T): Context<T> => {
  const context: Context<T> = {
    Provider({ value, children }) {
      const [contextValue, setContextValue] = useContextState({
        value: value ? value : defaultValue,
        context,
      });

      if (contextValue.value !== value) {
        setContextValue({ value, context });
      }

      return children;
    },
  };

  return context;
};
