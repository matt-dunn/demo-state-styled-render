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

type Module = any;

type GetModule = () => Promise<Module>;

type ExportResolver = (module: Module) => FC;

export const lazy = (getModule: GetModule, exportResolver: ExportResolver) => {
  return (props = {}) => {
    const [component, setComponent] = useState<FC | undefined>(undefined);

    useEffect(() => {
      (async function () {
        setComponent(exportResolver(await getModule()));
      })();
    }, []);

    // @TODO: currently need to be in placeholder element to proved a valid mount point. The tree update would need to support dynamic mounting
    return <div data-placeholder>{component ? component(props) : ""}</div>;
  };
};
