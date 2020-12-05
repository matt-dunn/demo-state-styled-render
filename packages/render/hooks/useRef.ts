/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import activeHooks, { HookImplementation } from "./index";
import { looseRef, LooseRef } from "../utils";

const HOOK_TYPE = "useRef";

export type UseRef<T> = {
  ref: LooseRef<T>;
} & HookImplementation;

export const useRef = <T>(value: T): LooseRef<T> => {
  const hook = activeHooks.getCurrent<UseRef<T>>();

  const currentValue = hook.getValue();

  if (currentValue) {
    return currentValue.ref;
  }

  const updatedValue = hook.setValue({
    type: HOOK_TYPE,
    ref: looseRef(value),
  });

  return updatedValue.ref;
};

useRef.type = HOOK_TYPE;
