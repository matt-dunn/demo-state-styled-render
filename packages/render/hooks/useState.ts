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

  let currentState = hook.getValue();

  if (currentState === undefined) {
    currentState = hook.setValue({
      type: HOOK_TYPE,
      value: initialState,
      setter(newValue: S) {
        if (currentState && currentState.value !== newValue) {
          currentState.value = newValue;
          hook.setValue({
            ...currentState,
            value: newValue,
          });
          hook.options.render();
        }
        return newValue;
      },
    });
  }

  return [currentState.value, currentState.setter];
};

useState.type = HOOK_TYPE;
