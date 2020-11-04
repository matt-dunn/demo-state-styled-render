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
  hookId: HookID;
  currentState: any;
  previousTree?: AnyNode;
  renderTree: () => void;
  render: <S>(
    store?: Store<S>,
    actions?: Actions
  ) => (component: FC) => (mountPoint: HTMLElement) => void;
};

export const Mx: MxContainer = {
  hookId: (undefined as unknown) as HookID,
  currentState: undefined,
  previousTree: undefined,
  renderTree: (undefined as unknown) as () => void,

  render: (store, actions) => (component) => (mountPoint) => {
    const dispatchActions = Object.entries(actions || {}).reduce(
      (actions, [key, action]) => ({
        ...actions,
        [key]: (...args: any[]) => store?.dispatch(action(...args)),
      }),
      {}
    );

    Mx.renderTree = () => {
      activeHooks.setActive(Mx.hookId);

      const currentTree = component({ ...Mx.currentState, ...dispatchActions });
      updateTree(mountPoint, currentTree, Mx.previousTree);

      Mx.previousTree = currentTree;
    };

    Mx.hookId = activeHooks.register({
      render: Mx.renderTree,
    });

    Mx.currentState = store?.getState();

    store?.subscribe((state) => {
      Mx.currentState = state;
      Mx.renderTree();
    });

    return Mx.renderTree();
  },
};
