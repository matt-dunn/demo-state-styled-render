/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import activeHooks, { HookImplementation } from "./index";
import { Deps, hasChanged } from "../utils";
import { AnyCallback } from "../types";

const HOOK_TYPE = "useEffect";

type UseEffectCallback = () => AnyCallback;

export type UseEffect = {
  deps: Deps;
} & HookImplementation;

export const useEffect = (callback: UseEffectCallback, deps: Deps): void => {
  const hook = activeHooks.getCurrent<UseEffect>();

  const currentState = hook.getValue();

  const cleanup = () => {
    if (hasChanged(deps, currentState?.deps)) {
      currentState?.cleanup && currentState.cleanup();
      return callback();
    }

    return currentState?.cleanup;
  };

  hook.setValue({
    type: HOOK_TYPE,
    deps,
    cleanup: cleanup(),
  });
};

useEffect.type = HOOK_TYPE;
