/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import {ActionPayload, Reducers, State, Store, StoreCallback} from "./types";

export const createStore = <S>(reducers: Reducers<S>) => (initialState: S): Store<S> => {
  let state: State<S> = {...initialState};
  let callbacks: StoreCallback<S>[] = [];

  return {
    dispatch<P>(action: ActionPayload<P>) {
      const newState = Object.keys(reducers).reduce((currentState, key) => {
        const updatedState = reducers[key as keyof S](currentState[key as keyof S], action);

        if (updatedState !== currentState[key as keyof S]) {
          return {
            ...currentState,
            [key]: updatedState
          };
        }

        return currentState;
      }, state);

      if (newState !== state) {
        callbacks.forEach(callback => callback(newState, state));
        state = newState;
      }
    },
    getState: () => state,
    subscribe(cb: StoreCallback<S>) {
      callbacks = [...callbacks, cb];
    },
    unsubscribe(cb: StoreCallback<S>) {
      callbacks = callbacks.filter(callback => callback !== cb);
    }
  };
};
