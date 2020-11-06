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

  return {
    render: (component) => (mountPoint) => {
      const renderTree = () => {
        activeHooks.setActive(hookId);

        previousTree = updateTree(mountPoint, component({}), previousTree);
      };

      hookId = activeHooks.register({
        render: renderTree,
      });

      renderTree();
    },
  };
};

export const Mx = MxFactory();
