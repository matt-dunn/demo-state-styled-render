/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { ActionCreator, PayloadCreator, typeSymbol } from "./types";

export const createAction = <A extends any[], P>(
  type: string,
  payloadCreator: PayloadCreator<A, P>
): ActionCreator<A, P> => {
  const action = (...args: A) => ({
    type,
    payload: payloadCreator(...args),
  });

  const typedAction = action as ActionCreator<A, P>;

  typedAction[typeSymbol] = type;

  return typedAction;
};
