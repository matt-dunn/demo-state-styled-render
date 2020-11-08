/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import activeHooks, { HookImplementation } from "./index";

const HOOK_TYPE = "useError";

type UseErrorCallback = (error: Error) => void;

export type UseError = {
  handleError: UseErrorCallback;
} & HookImplementation;

export const useError = (callback: UseErrorCallback): void => {
  const hook = activeHooks.getCurrent<UseError>();

  hook.setValue({
    type: HOOK_TYPE,
    handleError: callback,
  });
};

useError.type = HOOK_TYPE;
