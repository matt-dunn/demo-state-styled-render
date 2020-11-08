/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { AnyNode, FC } from "./types";
import { updateTree } from "./element";
import activeHooks, { HookID } from "./hooks";

type MxContainer = {
  render: (component: FC) => (mountPoint: HTMLElement) => void;
};

const MxFactory = (): MxContainer => {
  let hookId: HookID;
  let previousTree: AnyNode | undefined;
  let rendering = false;

  return {
    render: (component) => (mountPoint) => {
      const renderTree = () => {
        activeHooks.setActive(hookId);

        rendering = true;
        previousTree = updateTree(mountPoint, component({}), previousTree);
        rendering = false;
      };

      hookId = activeHooks.register({
        render: () => {
          if (rendering) {
            // Push into next tick if currently rendering
            setTimeout(renderTree);
          } else {
            renderTree();
          }
        },
      });

      renderTree();
    },
  };
};

export const Mx = MxFactory();
