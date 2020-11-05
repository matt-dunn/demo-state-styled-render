/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { Context, getValueSymbol } from "../context";

const HOOK_TYPE = "useContext";

export const useContext = <T = any>(context: Context<T>): T | undefined =>
  context[getValueSymbol]();

useContext.type = HOOK_TYPE;
