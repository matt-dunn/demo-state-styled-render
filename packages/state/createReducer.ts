/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { ActionPayload, ReducersMap } from "./types";

export const createReducer = <
  S extends any,
  P,
  A extends ActionPayload<P> = ActionPayload<P>
>(
  reducers: ReducersMap<S, P, A>
) => (state: S, action: A): S => {
  const reducer = reducers[action.type];
  return (reducer && reducer(state, action)) || state;
};
