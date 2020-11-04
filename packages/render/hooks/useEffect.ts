/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import activeHooks, { HookImplementation } from "./index";
import { hasChanged } from "../utils";

const HOOK_TYPE = "useEffect";

type UseEffectCallback = () => (() => any) | void;

export type UseEffect = {
  deps: any[];
  callback: UseEffectCallback;
  cleanup?: any;
} & HookImplementation;

export const useEffect = (callback: UseEffectCallback, deps: any[]): void => {
  const hook = activeHooks.getCurrent<UseEffect>();

  const currentState = hook.getValue();

  let cleanup = currentState?.cleanup;

  if (hasChanged(deps, currentState?.deps)) {
    currentState?.cleanup();
    cleanup = callback();
  }

  const value = {
    type: HOOK_TYPE,
    deps,
    cleanup,
    callback,
  };

  hook.setValue(value);
};

useEffect.type = HOOK_TYPE;
