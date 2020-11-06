/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { jsx } from "./jsx";
import { useEffect, useState } from "./hooks";
import { FC } from "./types";

type Module<T> = T;

type GetModule<T> = () => Promise<Module<T>>;

type ExportResolver<T> = (module: Module<T>) => FC;

export function lazy<T>(
  getModule: GetModule<T>,
  exportResolver?: ExportResolver<T>
) {
  return (props = {}) => {
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

    // @TODO: currently need to be in placeholder element to proved a valid mount point. The tree update would need to support dynamic mounting
    return <div data-placeholder>{component ? component(props) : ""}</div>;
  };
}
