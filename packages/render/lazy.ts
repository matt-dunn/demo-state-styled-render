/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { useContext, useEffect, useState } from "./hooks";
import { FC } from "./types";
import { createElement } from "./element";
import { createContext } from "./context";

type Module<T> = T;

type GetModule<T> = () => Promise<Module<T>>;

type ExportResolver<T, P> = (module: Module<T>) => FC<P>;

export const LazyContext = createContext<(promise: Promise<any>) => void>();

export const lazy = <T, P>(
  getModule: GetModule<T>,
  exportResolver?: ExportResolver<T, P>
) => (props = {} as P) => {
  const [component, setComponent] = useState<FC | undefined>(undefined);

  const setPromise = useContext(LazyContext);

  useEffect(() => {
    const promise = new Promise((resolve) => {
      const module = getModule() as Promise<Module<T> & { default: any }>;

      module.then((module) => {
        const resolvedComponent = exportResolver
          ? exportResolver(module)
          : module.default;

        if (!resolvedComponent) {
          throw new TypeError("Unable to load component");
        }

        setTimeout(() => {
          // reject(new TypeError("Unable to load component"));
          setComponent(resolvedComponent);
          resolve(resolvedComponent);
        }, 2000);
      });
    });

    setPromise && setPromise(promise);
  }, []);

  if (!component) {
    return null;
  }

  return createElement(component, props);
};
