/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import {
  jsx,
  Node,
  createElement,
  useEffect,
  useState,
  useContext,
  createContext,
} from "packages/render";

import { Store, Dispatch, InferableComponentEnhancerWithProps } from "./types";

type StoreContextProvider<S> = {
  store: Store<S>;
  children: Node;
};

type MapStateToProps<TStateProps, TState> = {
  (state: TState): TStateProps;
};

type MapDispatchToPropsFunction<S> = {
  (dispatch: Dispatch): S;
};

type MapDispatchToProps<S> = S & DispatchMap;

type MapDispatch<S> = MapDispatchToProps<S> | MapDispatchToPropsFunction<S>;

type DispatchMap = {
  [key: string]: (...args: any[]) => any;
};

const StoreContext = createContext<Store<any>>({} as Store<any>);

function isMapDispatchToPropsFunction<T>(
  arg: any
): arg is MapDispatchToPropsFunction<T> {
  return (typeof arg === "function" && true) || false;
}

function isMapDispatchToProps<T>(arg: any): arg is MapDispatchToProps<T> {
  return (arg && typeof arg === "object" && true) || false;
}

export const StoreProvider = <S extends Record<string, unknown>>({
  store,
  children,
}: StoreContextProvider<S>) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);

export function connect<
  TStateProps = Record<string, unknown>,
  TOwnProps = Record<string, unknown>,
  TDispatchProps = Record<string, unknown>,
  TState = Record<string, unknown>
>(
  mapStateToProps: MapStateToProps<TStateProps, TState>,
  mapDispatchToProps: MapDispatch<TDispatchProps>
): InferableComponentEnhancerWithProps<
  TStateProps & TDispatchProps,
  TOwnProps
> {
  return (Component) => (ownProps) => {
    const store = useContext(StoreContext);

    if (!store) {
      throw TypeError("No store provider configured");
    }

    // @TODO: memorise the actions...
    // const actions = useMemo(() => {
    const getActions = () => {
      if (isMapDispatchToPropsFunction(mapDispatchToProps)) {
        return mapDispatchToProps(store.dispatch);
      }

      if (isMapDispatchToProps(mapDispatchToProps)) {
        return Object.keys(mapDispatchToProps).reduce(
          (currentActions, key) => ({
            [key]: (...args: any[]) =>
              store.dispatch(mapDispatchToProps[key](...args)),
            ...currentActions,
          }),
          {} as DispatchMap
        );
      }

      return {};
    };
    // }, [store]);

    const actions = getActions();

    const [props, setProps] = useState(mapStateToProps(store.getState()));

    useEffect(() => {
      const cb = (state: TState) => setProps(mapStateToProps(state));

      store.subscribe(cb);

      return () => {
        store.unsubscribe(cb);
      };
    }, [store]);

    return createElement(Component, {
      ...ownProps,
      ...props,
      ...actions,
    });
  };
}
