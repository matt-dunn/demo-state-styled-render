/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import activeHooks, { HookImplementation, useState } from "./index";

const HOOK_TYPE = "useError";

type UseErrorCallback = (error: Error) => void | undefined | Partial<Error>;

export type UseError = {
  handleError: UseErrorCallback;
} & HookImplementation;

export const useError = (callback?: UseErrorCallback): Error | undefined => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const hook = activeHooks.getCurrent<UseError>();

  hook.setValue({
    type: HOOK_TYPE,
    handleError: (error) => {
      try {
        const errorFromCallback = callback?.(error);

        if (errorFromCallback) {
          return errorFromCallback;
        }

        setError(error);
      } catch (ex) {
        return ex;
      }
    },
  });

  return error;
};

useError.type = HOOK_TYPE;
