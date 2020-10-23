/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import {Actions, Store} from "packages/state";

import {FC, Node} from "./types";
import {updateTree} from "./element";

type UseState = <S = any>(initialState: S) => [S, (newValue: S) => S];

type MxContainer = {
  index: number;
  state: any[];
  currentState: any;
  currentTree?: Node;
  renderTree: () => void;
  useState: UseState;
  render: <S>(store: Store<S>, actions: Actions) => (component: FC) => (mountPoint: HTMLElement) => void;
}

export const Mx: MxContainer = {
  index: 0,
  state: [],
  currentState: undefined,
  currentTree: undefined,
  renderTree: undefined as unknown as () => void,
  useState: <S = any>(initialState: S) => {
    const activeIndex = Mx.index;

    if (Mx.state[activeIndex] === undefined) {
      Mx.state[activeIndex] = initialState;
    }

    const currentState = Mx.state[activeIndex];

    const setter = (newValue: S) => {
      if (Mx.state[activeIndex] !== newValue) {
        Mx.state[activeIndex] = newValue;
        Mx.renderTree();
      }
      return newValue;
    };

    Mx.index++;

    return [currentState, setter];
  },
  render: (store, actions) => component => mountPoint => {
    const dispatchActions = Object.entries(actions).reduce((actions, [key, action]) => ({
      ...actions,
      [key]: (...args: any[]) => store.dispatch(action(...args))
    }), {});

    Mx.renderTree = () => {
      const currentTree = component({...Mx.currentState, ...dispatchActions});
      updateTree(mountPoint, currentTree, Mx.currentTree);

      Mx.currentTree = currentTree;
      Mx.index = 0;
    };

    Mx.currentState = store.getState();

    store.subscribe((state) => {
      Mx.currentState = state;
      Mx.renderTree();
    });

    return Mx.renderTree();
  }
};

export const useState = Mx.useState;
