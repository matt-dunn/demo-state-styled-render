/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import activeHooks, { HookImplementation } from "./index";

const HOOK_TYPE = "useContextState";

export type ContextValue<T> = {
  context: any;
  value: T;
};

export type UseContextState<S> = {
  value: S;
  setter: (newValue: S) => S;
} & HookImplementation;

export const useContextState = <T, S = ContextValue<T>>(
  initialState: S
): [S, (newValue: S) => S] => {
  const hook = activeHooks.getCurrent<UseContextState<S>>();

  const currentState = hook.getValue();

  const updatedState = hook.setValue({
    type: HOOK_TYPE,
    value: currentState ? currentState.value : initialState,
    setter(newValue: S) {
      if (hook.getValue()?.value !== newValue) {
        hook.setValue({
          ...updatedState,
          value: newValue,
        });
      }
      return newValue;
    },
  });

  return [updatedState.value, updatedState.setter];
};

useContextState.type = HOOK_TYPE;
