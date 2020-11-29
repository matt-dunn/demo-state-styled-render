/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import activeHooks, { HookImplementation } from "./index";

const HOOK_TYPE = "useState";

type Setter<S> =
  | S
  | {
      (currentValue: S): S;
    };

type UseState<S> = {
  value: S;
  setter: (newValue: Setter<S>) => S;
} & HookImplementation;

export const useState = <S>(
  initialState: S | (() => S)
): [S, (newValue: Setter<S>) => S] => {
  const hook = activeHooks.getCurrent<UseState<S>>();

  const currentState = hook.getValue();

  const updatedState = hook.setValue({
    type: HOOK_TYPE,
    value: currentState
      ? currentState.value
      : typeof initialState === "function"
      ? (initialState as () => S)()
      : initialState,
    setter(newValue) {
      const currentValue = hook.getValue()?.value;
      const updatedValue =
        typeof newValue === "function"
          ? (newValue as (currentValue?: S) => S)(currentValue)
          : newValue;

      if (currentValue !== updatedValue) {
        hook.setValue({
          ...updatedState,
          value: updatedValue,
        });
        hook.options.render();
      }
      return updatedValue;
    },
  });

  return [updatedState.value, updatedState.setter];
};

useState.type = HOOK_TYPE;
