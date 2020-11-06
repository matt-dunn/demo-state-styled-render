/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { ActionCreator, ActionType, typeSymbol } from "./types";

export const getType = <P>(actionCreator: ActionCreator<any, P>): ActionType =>
  actionCreator[typeSymbol];
