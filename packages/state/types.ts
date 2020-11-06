/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { FC } from "packages/render";

export const typeSymbol = Symbol("type");

export type ActionType = string;

export type ActionPayload<P> = {
  type: ActionType;
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

export type GetProps<C> = C extends FC<infer P> ? P : never;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Shared<InjectedProps, DecorationTargetProps> = {
  [P in Extract<
    keyof InjectedProps,
    keyof DecorationTargetProps
  >]?: InjectedProps[P] extends DecorationTargetProps[P]
    ? DecorationTargetProps[P]
    : never;
};

export type Matching<InjectedProps, DecorationTargetProps> = {
  [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
    ? InjectedProps[P] extends DecorationTargetProps[P]
      ? DecorationTargetProps[P]
      : InjectedProps[P]
    : DecorationTargetProps[P];
};

export type InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> = <
  C extends FC<Matching<TInjectedProps, GetProps<C>>>
>(
  component: C
) => FC<
  Omit<GetProps<C>, keyof Shared<TInjectedProps, GetProps<C>>> & TNeedsProps
>;
