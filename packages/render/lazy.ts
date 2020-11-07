/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { useEffect, useState } from "./hooks";
import { FC } from "./types";

type Module<T> = T;

type GetModule<T> = () => Promise<Module<T>>;

type ExportResolver<T, P> = (module: Module<T>) => FC<P>;

export const lazy = <T, P>(
  getModule: GetModule<T>,
  exportResolver?: ExportResolver<T, P>
) => (props = {} as P) => {
  const [component, setComponent] = useState<FC | undefined>(undefined);

  useEffect(() => {
    (async function () {
      const module = (await getModule()) as Module<T> & { default: any };
      const resolvedComponent = exportResolver
        ? exportResolver(module)
        : module.default;

      if (!resolvedComponent) {
        throw new TypeError("Unable to load component");
      }

      setComponent(resolvedComponent);
    })();
  }, []);

  return component?.(props) || null;
};
