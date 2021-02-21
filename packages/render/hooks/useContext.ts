/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { Context } from "../context";
import activeHooks from "./index";

const HOOK_TYPE = "useContext";

export const useContext = <T = any>(context: Context<T>): T =>
  activeHooks
    .getActive()
    ?.context?.contexts?.find((c) => c.value.context === context)?.value.value;

useContext.type = HOOK_TYPE;
