/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { ActionCreator, PayloadCreator, typeSymbol } from "../../types";

type AnyAction = (...args: any[]) => any;

type MockActionCreator<A extends any[], P> = ActionCreator<A, P> & jest.Mock;

export interface MockAction<
  Action extends AnyAction,
  P = ReturnType<Action>,
  A extends any[] = Parameters<Action>
> extends jest.Mock<P, A>,
    ActionCreator<A, P> {
  [typeSymbol]: string;
}

export const createMockAction = <A extends any[], P>(
  type?: string,
  payloadCreator?: PayloadCreator<A, P>
): MockActionCreator<A, P> => {
  const action = (...args: A) => ({
    type,
    payload: payloadCreator && payloadCreator(...args),
  });

  const typedAction = action as MockActionCreator<A, P>;

  typedAction[typeSymbol] = type || "mock/ACTION";

  return jest.fn(typedAction) as MockActionCreator<A, P>;
};
