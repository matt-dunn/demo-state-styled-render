/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { AnyFunc, AnyNode, Component } from "./types";
import {updateTree, updateTreeChildren} from "./element";
import activeHooks, { HookID } from "./hooks";

type MxContainer = {
  render: (
    component: Component | AnyNode
  ) => (mountPoint: HTMLElement) => () => void;
};

export const MxFactory = (): MxContainer => {
  let hookId: HookID;
  let previousTree: AnyNode | undefined;
  let rendering = false;

  const renderQueue: AnyFunc[] = [];

  const x = []

  return {
    render: (component) => (mountPoint) => {
      const renderTree = () => {
        activeHooks.setActive(hookId);

        const xxxx = typeof component === "function" ? component({}) : component;

        const z = {
          type: "#fragment",
           children: [xxxx]
        }

        console.error("!!!",xxxx)
        rendering = true;
        previousTree = updateTreeChildren(
          mountPoint,
          xxxx,
          previousTree
        );
        rendering = false;

        // previousTree = xxxx

        // x.push(previousTree)

        console.error("!!!END", xxxx, previousTree);

        if (renderQueue.length > 0) {
          renderQueue.shift()?.();
        }
      };

      hookId = activeHooks.register({
        render: () => {
          if (rendering) {
            // @TODO: Currently just use the first item in the queue as we just want a re-render of the entire tree if requested.
            //        Will need to push to the queue once branch rendering is supported with a cycle check for infinite loop cascading
            renderQueue[0] = renderTree;
            // renderQueue.push(renderTree);
          } else {
            renderTree();
          }
        },
      });

      renderTree();

      return renderTree;
    },
  };
};

export const Mx = MxFactory();
