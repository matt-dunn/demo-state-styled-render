/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

export const typeSymbol = Symbol("type");

export type ActionPayload<P> = {
  type: string;
  payload: P;
};

export type StoreCallback<S> = (newState: S, state: S) => void;

export type Reducer<S, P, A extends ActionPayload<P>> = (
  state: S,
  action: A
) => S;

export type Reducers<
  S = any,
  P = any,
  A extends ActionPayload<P> = ActionPayload<P>
> = {
  [K in keyof S]: Reducer<S[K], P, A>;
};

export type State<S> = {
  [K in keyof S]: S[K];
};

export type PayloadCreator<A extends any[], P> = (...args: A) => P;

export type ActionCreator<A extends any[], P> = {
  (...args: A): ActionPayload<P>;
  [typeSymbol]: string;
};

export type Dispatch = <P>(action: ActionPayload<P>) => void;

export type Store<S> = {
  dispatch: Dispatch;
  getState: () => S;
  subscribe: (cb: StoreCallback<S>) => void;
  unsubscribe: (cb: StoreCallback<S>) => void;
};

export type Actions = {
  [key: string]: ActionCreator<any, any>;
};

export type ReducersMap<
  S,
  P = any,
  A extends ActionPayload<P> = ActionPayload<P>
> = {
  [key: string]: Reducer<S, P, A>;
};
