/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import activeHooks, { HookImplementation } from "./index";

const HOOK_TYPE = "useState";

type UseState<S> = {
  value: S;
  setter: (newValue: S) => S;
} & HookImplementation;

export const useState = <S = any>(initialState: S): [S, (newValue: S) => S] => {
  const hook = activeHooks.getCurrent<UseState<S>>();

  const currentState = hook.getValue();

  const updatedState = hook.setValue({
    type: HOOK_TYPE,
    value: currentState?.value ?? initialState,
    setter(newValue: S) {
      if (updatedState.value !== newValue) {
        hook.setValue({
          ...updatedState,
          value: newValue,
        });
        hook.options.render();
      }
      return newValue;
    },
  });

  return [updatedState.value, updatedState.setter];
};

useState.type = HOOK_TYPE;
