/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { Actions, Store } from "packages/state";

import { AnyNode, FC } from "./types";
import { updateTree } from "./element";
import activeHooks, { HookID } from "./hooks";

type MxContainer = {
  render: <S>(
    store?: Store<S>,
    actions?: Actions
  ) => (component: FC) => (mountPoint: HTMLElement) => void;
};

const MxFactory = (): MxContainer => {
  let hookId: HookID;
  let currentState: any;
  let previousTree: AnyNode | undefined;
  let renderTree: () => void;

  return {
    render: (store, actions) => (component) => (mountPoint) => {
      const dispatchActions = Object.entries(actions || {}).reduce(
        (actions, [key, action]) => ({
          ...actions,
          [key]: (...args: any[]) => store?.dispatch(action(...args)),
        }),
        {}
      );

      renderTree = () => {
        activeHooks.setActive(hookId);

        previousTree = updateTree(
          mountPoint,
          component({
            ...currentState,
            ...dispatchActions,
          }),
          previousTree
        );
      };

      hookId = activeHooks.register({
        render: renderTree,
      });

      currentState = store?.getState();

      store?.subscribe((state) => {
        currentState = state;
        renderTree();
      });

      return renderTree();
    },
  };
};

export const Mx = MxFactory();
